import { v } from "convex/values";
import { mutation, query } from './_generated/server';

export const createUser = mutation({
  args: { name: v.string(), email: v.string(), picture: v.string(), uid: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .collect();

    if (user.length === 0) {
      // Create new user
      const result = await ctx.db.insert('users', {
        name: args.name,
        email: args.email,
        picture: args.picture,
        uid: args.uid,
      });
      return result;
    } else {
      // Update existing user's info
      const existingUser = user[0];
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        picture: args.picture,
      });
      return existingUser;
    }
  },
});

export const GetUser = query({
  args: {
    email: v.string()
  },
  handler: async (ctx, args) => {
    if (!args.email) return null;
    
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .collect();

    return user[0] || null;
  }
});




