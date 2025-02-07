document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';  // Stores the current input by the user
    let operator = '';      // Stores the operator
    let previousInput = ''; // Stores the previous input for calculations

    // Add event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;

            if (value === 'C') {
                // Clear all inputs and reset display
                currentInput = '';
                previousInput = '';
                operator = '';
                display.value = '0';
            } else if (value === '←') {
                // Remove the last character from the current input
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput || '0';
            } else if (value === '=') {
                // Calculate the result using eval and update display
                try {
                    currentInput = eval(previousInput + operator + currentInput).toString();
                    display.value = currentInput;
                    operator = '';
                    previousInput = '';
                } catch (e) {
                    display.value = 'Error';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                // Store the operator and prepare for the next input
                if (currentInput) {
                    previousInput = currentInput;
                    operator = value;
                    currentInput = '';
                }
            } else {
                // Update the current input and display it
                if (currentInput === '0' && value !== '.') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
                display.value = currentInput;
            }
        });
    });

    // Optional: Add keyboard support for better UX
    document.addEventListener('keydown', (e) => {
        const key = e.key;

        if (/[0-9.%]/.test(key)) {
            // Append numbers and the decimal point
            currentInput += key;
            display.value = currentInput;
        } else if (['+', '-', '*', '/'].includes(key)) {
            // Handle operators
            previousInput = currentInput;
            operator = key;
            currentInput = '';
        } else if (key === 'Enter') {
            // Calculate result on 'Enter' key press
            try {
                currentInput = eval(previousInput + operator + currentInput).toString();
                display.value = currentInput;
                operator = '';
                previousInput = '';
            } catch {
                display.value = 'Error';
            }
        } else if (key === 'Backspace') {
            // Handle 'Backspace' to delete last character
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput || '0';
        } else if (key === 'Escape') {
            // Handle 'Escape' to clear the calculator
            currentInput = '';
            previousInput = '';
            operator = '';
            display.value = '0';
        }
    });
});
