import { sqliteTable, text, integer, primaryKey, index } from 'drizzle-orm/sqlite-core';
export const cart=sqliteTable('cart',{owner:text('owner').notNull(),productId:text('product_id').notNull(),quantity:integer('quantity').notNull()},t=>[primaryKey({columns:[t.owner,t.productId]})]);
export const wishlist=sqliteTable('wishlist',{owner:text('owner').notNull(),productId:text('product_id').notNull()},t=>[primaryKey({columns:[t.owner,t.productId]})]);
export const recentlyViewed=sqliteTable('recently_viewed',{owner:text('owner').notNull(),productId:text('product_id').notNull(),viewedAt:text('viewed_at').notNull()},t=>[primaryKey({columns:[t.owner,t.productId]})]);
export const profiles=sqliteTable('profiles',{owner:text('owner').primaryKey(),data:text('data').notNull()});
export const orders=sqliteTable('orders',{id:text('id').primaryKey(),owner:text('owner').notNull(),createdAt:text('created_at').notNull(),data:text('data').notNull()},t=>[index('idx_orders_owner_created').on(t.owner,t.createdAt)]);
export const reviews=sqliteTable('reviews',{id:text('id').primaryKey(),owner:text('owner').notNull(),productId:text('product_id').notNull(),name:text('name').notNull(),rating:integer('rating').notNull(),body:text('body').notNull(),createdAt:text('created_at').notNull()},t=>[index('idx_reviews_product').on(t.productId)]);
export const enquiries=sqliteTable('enquiries',{id:text('id').primaryKey(),kind:text('kind').notNull(),email:text('email').notNull(),data:text('data').notNull(),createdAt:text('created_at').notNull()});
