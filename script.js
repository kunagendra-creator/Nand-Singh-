// Excel Calculator - JavaScript Formula Implementation

// Get all input fields and formula cells
const inputs = document.querySelectorAll('input[type="number"]');
const table = document.getElementById('calculatorTable');

// Function to get cell value (handles both inputs and calculated cells)
function getCellValue(cellId) {
    const cell = document.getElementById(cellId);
    if (cell) {
        if (cell.tagName === 'INPUT') {
            return parseFloat(cell.value) || 0;
        } else {
            // Parse percentage or number from text
            const text = cell.textContent.trim();
            return parseFloat(text.replace('%', '')) || 0;
        }
    }
    return 0;
}

// Function to set cell value
function setCellValue(cellId, value, isPercentage = false) {
    const cell = document.getElementById(cellId);
    if (cell && cell.tagName !== 'INPUT') {
        if (isPercentage) {
            cell.textContent = (value * 100).toFixed(2) + '%';
        } else {
            cell.textContent = value.toFixed(2);
        }
    }
}

// Function to calculate all formulas
function calculateFormulas() {
    // Row 7: Weightage = B6*B5 and C6*C5
    // B7 = B6 * B5 = 100 * 0.7
    const B7 = getCellValue('B6') * getCellValue('B5');
    setCellValue('B7', B7);
    
    // C7 = B6 * C5 = 100 * 0.3 (using B6 as total weight)
    const C7 = getCellValue('B6') * getCellValue('C5');
    setCellValue('C7', C7);

    // Row 10: Achievement% = B9/B8 and C9/C8
    const B10 = getCellValue('B9') / getCellValue('B8');
    setCellValue('B10', B10, true);
    
    const C10 = getCellValue('C9') / getCellValue('C8');
    setCellValue('C10', C10, true);

    // Row 11: Capping = IF(X10>120%, 120%, X10)
    const B11 = Math.min(B10, 1.2); // 120% = 1.2
    setCellValue('B11', B11, true);
    
    const C11 = Math.min(C10, 1.2);
    setCellValue('C11', C11, true);

    // Row 12: Earn Points = B7*B11 and C7*C11
    const B12 = B7 * B11;
    setCellValue('B12', B12);
    
    const C12 = C7 * C11;
    setCellValue('C12', C12);

    // Row 13: Total Points = SUM(B12:C12)
    const B13 = B12 + C12;
    setCellValue('B13', B13);

    // Row 14: Category = IF(B13>=100,"A",IF(B13>=88,"B",IF(B13>=80,"C","D")))
    let category = 'D';
    if (B13 >= 100) {
        category = 'A';
    } else if (B13 >= 88) {
        category = 'B';
    } else if (B13 >= 80) {
        category = 'C';
    }
    const categoryCell = document.getElementById('B14');
    if (categoryCell) {
        categoryCell.textContent = category;
    }
}

// Add event listeners to all inputs
inputs.forEach(input => {
    input.addEventListener('change', calculateFormulas);
    input.addEventListener('input', calculateFormulas);
});

// Initial calculation on page load
window.addEventListener('DOMContentLoaded', calculateFormulas);

// Also recalculate if any manual changes are made
table.addEventListener('change', calculateFormulas);