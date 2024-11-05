document.getElementById('processButton').addEventListener('click', function() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;

            Tesseract.recognize(
                img,
                'rus',
                {
                    logger: info => console.log(info) // Вывод информации о процессе распознавания
                }
            ).then(({ data: { text } }) => {
                displayResult(text);
            });
        };

        reader.readAsDataURL(file);
    } else {
        alert('Пожалуйста, загрузите изображение.');
    }
});

function displayResult(text) {
    const resultDiv = document.getElementById('result');
    const rows = text.split('\n').map(row => row.split('\t'));
    
    let html = '<table>';
    rows.forEach(row => {
        html += '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
    });
    html += '</table>';
    
    resultDiv.innerHTML = html;
}
