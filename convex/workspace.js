import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const  CreateWorkspace = mutation({
    args:{
        message:v.any(),
        user:v.id('users')
    },

    handler:async(ctx,args)=>{
        const workspaceID = await ctx.db.insert("workspace",{
            message: args.message,
            user:args.user
        });
        return workspaceID;
    }
})

export const GetWorkspace =query({
    args:{
        workspaceID:v.id('workspace')
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.get(args.workspaceID);
        return result;
    }
    
})



export const UpdateMessages = mutation({
    args:{
        workspaceID:v.id('workspace'),
        message:v.any()
    },
    handler:async(ctx,args)=>{
    const result = await ctx.db.patch(args.workspaceID,{
        message:args.message
    });
    
    return result;
    }
})



export const UpdateFiles= mutation({
    args:{
        workspaceID:v.id('workspace'),
        files:v.any()
    },
    handler:async(ctx,args)=>{
    const result = await ctx.db.patch(args.workspaceID,{
        fileDatat:args.files
    });
    
    return result;
    }
})

export const GetAllWorkspace = query({
    args:{
        userId:v.id('users')
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.query('workspace').filter(q => q.eq(q.field('user'), args.userId)).collect();
        return result;
    }
})