const fs = require('fs');
const path = require('path');

// Files with unused variables errors
const fileErrorMap = {
  'controllers/controller.js': ['AppError'],
  'middleware/middleware.js': ['next', 'error']
  // Add other files and their unused variables
};

// Process each file
Object.entries(fileErrorMap).forEach(([filePath, unusedVars]) => {
  const fullPath = path.join(process.cwd(), filePath);

  try {
    let content = fs.readFileSync(fullPath, 'utf8');

    // For each unused variable, prefix it with an underscore
    unusedVars.forEach(varName => {
      // Handle const/let/var declarations
      content = content.replace(
        new RegExp(`(const|let|var)\\s+(${varName})\\s*=`, 'g'),
        (match, declarationType, name) => `${declarationType} _${name} =`
      );

      // Handle function parameters
      content = content.replace(
        new RegExp(`\\((.*?)(\\b${varName}\\b)(.*?)\\)`, 'g'),
        (match, before, name, after) => `(${before}_${name}${after})`
      );
    });

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed unused variables in ${filePath}`);
  } catch (err) {
    console.error(`❌ Error processing ${filePath}:`, err);
  }
});