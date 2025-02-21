async function analyzeResume() {
    const fileInput = document.getElementById('resumeUpload');
    const resultDiv = document.getElementById('result');
    
    if (!fileInput.files || !fileInput.files[0]) {
        resultDiv.innerHTML = '<p style="color: red;">Please upload a resume file (PDF, DOC, or DOCX).</p>';
        return;
    }

    const formData = new FormData();
    formData.append('resume', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.error) {
            resultDiv.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
        } else {
            resultDiv.innerHTML = `
                <p>Your ATS Score: <span style="color: #f15bb5;">${data.score}%</span></p>
                <p>Matched Keywords: ${data.matched_keywords.join(', ') || 'None'}</p>
            `;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Show/hide profile dropdown on profile pic click
document.querySelector('.profile-pic').addEventListener('click', function() {
    const dropdown = document.querySelector('.profile-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown if clicking outside
document.addEventListener('click', function(event) {
    const profileContainer = document.querySelector('.profile-container');
    const dropdown = document.querySelector('.profile-dropdown');
    if (!profileContainer.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});