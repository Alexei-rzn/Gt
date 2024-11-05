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
                'eng+rus', // Задаем языки для распознавания (русский и английский)
                {
                    logger: info => console.log(info) // Логирование процесса распознавания
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
    
    // Разделим текст на строки для отображения в таблице
    const rows = text.split('\n').map(row => row.split(/\s+/)); // Разделяем строку по пробелам
    
    let html = '<table><tr><th>Текст</th></tr>';
    rows.forEach(row => {
        if (row.length > 0 && row[0] !== '') { // Игнорируем пустые строки
            html += '<tr><td>' + row.join(' ') + '</td></tr>'; // Объединяем ячейки
        }
    });
    html += '</table>';
    
    resultDiv.innerHTML = html;
}
