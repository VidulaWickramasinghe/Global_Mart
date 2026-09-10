import { createClient, type Client } from '@libsql/client';

let client: Client | null = null;

function getClient(): Client {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error(
      'TURSO_DATABASE_URL is not configured.'
    );
  }

  client = createClient({
    url,
    authToken,
  });

  return client;
}

class Statement {
  private values: unknown[] = [];

  constructor(
    private readonly sql: string,
    private readonly db: Client
  ) {}

  bind(...values: unknown[]) {
    this.values = values;
    return this;
  }

  async all<T = Record<string, unknown>>() {
    const result = await this.db.execute({
      sql: this.sql,
      args: this.values as any[],
    });

    return {
      results: result.rows as unknown as T[],
      success: true,
      meta: {
        changes: result.rowsAffected ?? 0,
      },
    };
  }

  async first<T = Record<string, unknown>>() {
    const result = await this.all<T>();
    return result.results[0] ?? null;
  }

  async run() {
    const result = await this.db.execute({
      sql: this.sql,
      args: this.values as any[],
    });

    return {
      success: true,
      meta: {
        changes: result.rowsAffected ?? 0,
      },
    };
  }

  toBatchStatement() {
    return {
      sql: this.sql,
      args: this.values as any[],
    };
  }
}

export function database() {
  const db = getClient();

  return {
    prepare(sql: string) {
      return new Statement(sql, db);
    },

    async batch<T = Record<string, unknown>>(
      statements: Statement[]
    ) {
      const result = await db.batch(
        statements.map((statement) =>
          statement.toBatchStatement()
        )
      );

      return result.map((item) => ({
        results: item.rows as unknown as T[],
        success: true,
        meta: {
          changes: item.rowsAffected ?? 0,
        },
      }));
    },
  };
}
