async function commentPost(event) {
    event.preventDefault();

    const comment = document.querySelector('input[name="comment-body"]').value.trim();
    console.log("comment")
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const date_created =new Date().toLocaleDateString()
    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment, 
                date_created,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();

        } else {
            alert(response.statusText);
            document.querySelector('#comment-form').style.display = "block";
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentPost);