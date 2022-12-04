const newBlogPostSubmit = document.getElementById("submitNewBlogPost")


newBlogPostSubmit.addEventListener("submit",async (event)=>{
    event.preventDefault
    await fetch("/dashboard",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"test": "test"})
    })
    alert("done")
})