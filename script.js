document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const resultDiv = document.getElementById('result');
    const addBtn = document.getElementById('addBtn');
    const subtractBtn = document.getElementById('subtractBtn');
    const multiplyBtn = document.getElementById('multiplyBtn');
    const divideBtn = document.getElementById('divideBtn');

    // Validate input function
    function isValidNumber(value) {
        // Check if value is empty
        if (value.trim() === '') {
            return false;
        }
        // Check if value contains only numbers, decimal point, and minus sign
        const numberRegex = /^-?\d*\.?\d+$/;
        return numberRegex.test(value.trim()) && !isNaN(parseFloat(value));
    }

    // Calculate result
    function calculate(operation) {
        const input1 = num1Input.value;
        const input2 = num2Input.value;
        
        // Check if inputs are empty
        if (input1.trim() === '' || input2.trim() === '') {
            showError('Input tidak valid. harap masukkan angka yang benar!');
            return;
        }
        
        // Check if inputs are valid numbers
        if (!isValidNumber(input1) || !isValidNumber(input2)) {
            showError('Input tidak valid. harap masukkan angka yang benar!');
            return;
        }


        const num1 = parseFloat(input1);
        const num2 = parseFloat(input2);

        let result;
        let operatorSymbol;

        switch(operation) {
            case 'add':
                result = num1 + num2;
                operatorSymbol = '+';
                break;
            case 'subtract':
                result = num1 - num2;
                operatorSymbol = '-';
                break;
            case 'multiply':
                result = num1 * num2;
                operatorSymbol = '×';
                break;
            case 'divide':
                if (num2 === 0) {
                    showError('Tidak bisa dibagi dengan nol!');
                    return;
                }
                result = num1 / num2;
                operatorSymbol = '÷';
                break;
        }

        // Update result
        resultDiv.textContent = formatResult(result);
        resultDiv.classList.remove('error');
    }

    // Format result (handle decimal places)
    function formatResult(result) {
        // Check if result is integer
        if (Number.isInteger(result)) {
            return result.toString();
        }
        // Round to 6 decimal places max
        return parseFloat(result.toFixed(6)).toString();
    }

    // Show error message
    function showError(message) {
        resultDiv.textContent = message;
        resultDiv.classList.add('error');
        resultDiv.style.color = '#ff0000'; // Tambahkan inline style untuk memastikan warna merah
        resultDiv.style.fontWeight = 'bold';
        
        // Remove error class and inline styles after animation
        setTimeout(() => {
            resultDiv.classList.remove('error');
            resultDiv.style.color = '';
            resultDiv.style.fontWeight = '';
        }, 5000); // Perpanjang waktu menjadi 5 detik
    }

    // Real-time validation for inputs
    function validateInput(input) {
        const value = input.value;
        if (value !== '' && !isValidNumber(value)) {
            input.style.borderColor = '#ff0000';
            input.style.backgroundColor = '#ffe6e6';
        } else {
            input.style.borderColor = '';
            input.style.backgroundColor = '';
        }
    }

    // Event listeners
    addBtn.addEventListener('click', () => calculate('add'));
    subtractBtn.addEventListener('click', () => calculate('subtract'));
    multiplyBtn.addEventListener('click', () => calculate('multiply'));
    divideBtn.addEventListener('click', () => calculate('divide'));

    // Real-time input validation
    num1Input.addEventListener('input', () => validateInput(num1Input));
    num2Input.addEventListener('input', () => validateInput(num2Input));

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            calculate('add'); // Default operation
        } else if (e.key === '+') {
            calculate('add');
        } else if (e.key === '-') {
            calculate('subtract');
        } else if (e.key === '*') {
            calculate('multiply');
        } else if (e.key === '/') {
            e.preventDefault(); // Prevent browser search
            calculate('divide');
        }
    });
});