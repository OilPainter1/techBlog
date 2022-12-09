//const newBlogPostSubmit = document.getElementById("submitNewBlogPost")
const signUpSubmit = document.getElementById("signUp")
const loginSubmit = document.getElementById("login")
const newBlogPost= document.getElementById("submitNewBlogPost")



loginSubmit?.addEventListener("submit",async()=>{
    const loginUsername = document.getElementById("loginUsername").value.trim()
    const loginPassword = document.getElementById("loginPassword").value.trim()
    event.preventDefault()
    try{
     const userLogin = await fetch("/login",{
        method:"POST",
        body: JSON.stringify({loginUsername,loginPassword}),
        headers:{
                "Content-Type": "application/json"
        }
        })
    window.location.href="/dashboard"
    }catch(err){
        console.log(err)
    }
}
)
signUpSubmit?.addEventListener("submit",async()=>{
    const usernameInput = document.getElementById("usernameInput").value.trim()
    const passwordInput = document.getElementById("passwordInput").value.trim()
    event.preventDefault()
    await fetch("/login/signup", {
    method: "POST",
    body: JSON.stringify({usernameInput,passwordInput}),
    headers: {
        "Content-Type": "application/json"
    },
   })
   if(confirm("You are signed up!")){
    window.location.href="/dashboard"
   }
   else{
    window.location.href="/dashboard"
   }
   return 
})
console.log(newBlogPost)
newBlogPost?.addEventListener("submit",async(event)=>{
    event.preventDefault()
    const blogPostTitle = document.getElementById("blogPostTitle").value.trim()
    const blogPostContents = document.getElementById("blogPostContents").value.trim()
    await fetch("/dashboard/newBlogPost", {
        method: "POST",
        body: JSON.stringify({blogPostTitle,blogPostContents}),
        headers: {
            "Content-Type": "application/json"
        },
       })
       window.location.href=("/dashboard")
})