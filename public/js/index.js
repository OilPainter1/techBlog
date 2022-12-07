//const newBlogPostSubmit = document.getElementById("submitNewBlogPost")
const signUpSubmit = document.getElementById("signUp")


console.log("hello from index.js")
signUpSubmit.addEventListener("submit",async()=>{
    const usernameInput = document.getElementById("usernameInput").value.trim()
    const passwordInput = document.getElementById("passwordInput").value.trim()
    event.preventDefault()
    console.log(usernameInput)
    await fetch("/login", {
    method: "POST",
    body: JSON.stringify({usernameInput,passwordInput}),
    headers: {
        "Content-Type": "application/json"
    },
   })
   return 
})