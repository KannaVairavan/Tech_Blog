
async function createPost(event) {

    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="content"]').value;
    const date_created =new Date().toLocaleDateString()
    // alert(title);
    // alert(content);
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
        date_created
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };

    
document
.querySelector('.new-post-form')
.addEventListener('submit', createPost);
  
