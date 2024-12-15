import{z as e}from"./index-URDWOw5y.js";const r=e.object({title:e.string().min(1,"Title is required").min(3,"Title must be at least 3 characters long"),description:e.string().min(1,"Description is required").min(3,"Description must be at least of 3 characters long"),categories:e.array(e.string().min(1,"Category cannot be empty")).min(1,"At least one category is required").max(3,"Maximum of 3 categories are allowed").refine(t=>new Set(t).size===t.length,{message:"Duplicate categories are not allowed"}),content:e.string().min(1,"Content is required").min(40,"Content must be at least of 40 characters long")});export{r as P};
