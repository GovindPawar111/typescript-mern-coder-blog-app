import{r as d,p as R,u as K,a as W,e as $,b as z,q as k,P as L,f as H,l as X,j as e,L as Z,B as P,S as ee,T as w,d as te}from"./index-URDWOw5y.js";import{T as se}from"./TextEditor-c5npKfEC.js";import{u as ae,C,t as re}from"./zod-wQOMx4mP.js";import{P as oe}from"./postFormType-bINrwK31.js";import{S as ie}from"./arrow_back-U6SKPAG4.js";const ne=()=>{const[m,f]=d.useState(""),g=d.useRef(""),[c,h]=d.useState({file:null,previewImageURL:R}),{user:r}=K(),E=W(),i=$(),{createNotification:j}=te(),{showBoundary:D}=z(),{register:A,handleSubmit:B,setValue:b,getValues:N,formState:{errors:o},control:v,reset:S,setError:p}=ae({defaultValues:{title:"",description:"",categories:[],content:""},resolver:re(oe)});if(!i.postId)return;const x=k.getQueryData([L,{search:""}]),y=d.useMemo(()=>x==null?void 0:x.find(t=>t._id===i.postId),[x,i.postId]);let l;const{data:T,isError:_,error:V,isLoading:q}=H(i.postId,!y&&!l),{mutate:M}=X(i.postId);if(_&&D(V),l=y||T,d.useEffect(()=>{if(l){const{title:t,description:s,content:a,categories:n,headerImageUrl:u}=l;g.current=u,h({file:null,previewImageURL:u||R}),S({title:t||"",description:s||"",content:a||"",categories:n||[]})}},[l,S]),q||l===void 0)return e.jsx("div",{className:"w-full flex flex-grow",children:e.jsx(Z,{})});const O=()=>{const t=N("categories")||[];if(t.length>=3){f(""),p("categories",{message:"Maximum of 3 categories are allowed"});return}if((t==null?void 0:t.filter(s=>s===m.trim()).length)>0){p("categories",{message:"Duplicate categories are not allowed"});return}b("categories",[...t,m.trim()]),f("")},Q=t=>{var a;const s=(a=N("categories"))==null?void 0:a.filter(n=>n!==t);b("categories",s)},Y=t=>{const s=t.target,a=s.files[0];h(a?{file:s.files[0],previewImageURL:URL.createObjectURL(a)}:{file:null,previewImageURL:g.current})},G=async({title:t,description:s,categories:a,content:n})=>{if(r!=null&&r.isAnonymous){j("You need to log in as a real user to edit a post.",w.Info);return}if(!i.postId)return;const u={title:t,description:s,headerImageUrl:c.file?"":g.current,categories:a,content:n,username:r==null?void 0:r.username,userId:r==null?void 0:r.id},I=new FormData;c.file!==null&&I.append("header-image",c.file,c.file.name),I.append("data",JSON.stringify(u)),M({postId:i.postId,data:I},{onSuccess:F=>{y&&k.setQueryData([L,{search:""}],U=>U?[F,...U.filter(J=>J._id!==i.postId)]:[]),j("Post updated successfully",w.Success),E(`/posts/${F._id}`)},onError:()=>{j("Failed to update the post",w.Error)}})};return e.jsx("section",{className:"flex justify-center items-start w-full",children:e.jsxs("div",{className:"w-full py-8 px-4 sm:px-8 lg:w-[90%] min-[1400px]:w-[1240px]",children:[e.jsxs("div",{className:"flex justify-start align-center gap-1",children:[e.jsx(ie,{className:"cursor-pointer w-[32px] h-[24px] mt-[5px]",onClick:()=>E(-1)}),e.jsx("h1",{className:"font-bold text-xl md:text-2xl",children:"Edit a post"})]}),e.jsxs("form",{noValidate:!0,className:"w-full flex flex-col mt-4",onSubmit:B(G),children:[e.jsx("input",{type:"text",placeholder:"Enter post title",className:"px-4 py-2 text-black border-2 focus:border-black",...A("title")}),o.title&&e.jsx("label",{htmlFor:"title",className:"text-red-500 text-xs",children:o.title.message}),e.jsx(C,{name:"description",control:v,render:({field:t})=>e.jsx("textarea",{id:"description",...t,placeholder:"Enter post description",className:"px-4 py-2 text-black border-2 focus:border-black mt-4"})}),o.description&&e.jsx("label",{htmlFor:"description",className:"text-red-500 text-xs",children:o.description.message}),e.jsx("img",{src:c.previewImageURL,alt:"title",className:"w-[250px] h-[150px] object-cover cursor-pointer mt-4"}),e.jsx("input",{type:"file",className:"px-4 w-[300px] mt-4",accept:"image/*",onChange:t=>Y(t)}),e.jsx("div",{className:"flex flex-col mt-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{type:"text",placeholder:"Enter post categories",className:"px-4 py-2 mr-2 sm:mr-4 text-black border-2 focus:border-black",value:m,onChange:t=>f(t.target.value),onFocus:()=>{var t;(t=o.categories)!=null&&t.message&&p("categories",{message:""})}}),e.jsx(P,{label:"Add",onClick:()=>{m.trim()&&O()}})]})}),e.jsx(C,{name:"categories",control:v,render:({field:t})=>{var s;return e.jsx("div",{className:"flex flex-wrap",children:(s=t.value)==null?void 0:s.map((a,n)=>e.jsxs("div",{className:"flex justify-center items-center space-x-2 m-2 bg-gray-200 px-2 py-1 rounded",children:[e.jsx("span",{children:a}),e.jsx("span",{className:"text-black p-1 cursor-pointer text-sm",onClick:()=>Q(a),children:e.jsx(ee,{})})]},a+n))})}}),o.categories&&e.jsx("label",{htmlFor:"categories",className:"text-red-500 text-xs",children:o.categories.message}),e.jsx("div",{className:"mt-4",children:e.jsx(C,{control:v,name:"content",render:({field:t})=>e.jsx(se,{initialContent:N("content")||"",onChange:s=>{t.onChange(s)},onEmpty:s=>{s&&(b("content",""),p("content",{message:"Content is required"}),t.onBlur())}})})}),o.content&&e.jsx("label",{htmlFor:"content",className:"text-red-500 text-xs",children:o.content.message}),e.jsx(P,{type:"submit",label:"Save",className:"w-[200px] mx-auto text-lg md:text-xl mt-4"})]})]})})},xe=ne;export{xe as Component,ne as default};
