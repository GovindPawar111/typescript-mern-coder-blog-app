import{z as s,E as r}from"./index-URDWOw5y.js";const c=s.object({email:s.string().min(1,"Email is required").email("Please enter a valid email address"),password:s.string().min(1,"Password is required").min(8,"Password must be at least 8 characters long").max(100,"Password cannot exceed 100 characters").regex(/[A-Z]/,"Password must contain at least one uppercase letter").regex(/[a-z]/,"Password must contain at least one lowercase letter").regex(/[0-9]/,"Password must contain at least one number").regex(/[\W_]/,"Password must contain at least one special character")}),m=(a,o)=>{const{mutate:n}=r();return()=>{n(void 0,{onSuccess(e){a(e)},onError(e){o(e)}})}};export{c as L,m as u};
