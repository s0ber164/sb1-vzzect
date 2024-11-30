import { Prop } from '../types';

export function parseCSV(csvText: string): Partial<Prop>[] {
  try {
    // Remove BOM if present and normalize line endings
    const normalizedText = csvText.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
    
    const lines = normalizedText.split('\n')
      .map(line => line.trim())
      .filter(Boolean);
    
    if (lines.length < 2) {
      throw new Error('CSV file must contain at least headers and one data row');
    }
    
    const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
  
    const requiredHeaders = ['name', 'price', 'image_url', 'category', 'subcategory', 'quantity', 'dimensions'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
    }
    
    const props = lines.slice(1).map((line, lineIndex) => {
      // Handle quoted values properly
      const values: string[] = [];
      let currentValue = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim());
      
      if (values.length !== headers.length) {
        throw new Error(`Line ${lineIndex + 2} has ${values.length} values but expected ${headers.length}`);
      }
      
      const prop: Partial<Prop> = {};
      
      headers.forEach((header, index) => {
        const value = values[index];
        if (!value && header !== 'dimensions') {
          throw new Error(`Missing required value for ${header} on line ${lineIndex + 2}`);
        }
        
        switch (header) {
          case 'name':
          case 'category':
          case 'subcategory':
          case 'image_url':
          case 'dimensions':
            prop[header] = value;
            break;
          case 'price':
            const price = parseFloat(value);
            if (isNaN(price) || price < 0) {
              throw new Error(`Invalid price value on line ${lineIndex + 2}`);
            }
            prop.price = price;
            break;
          case 'quantity':
            const quantity = parseInt(value, 10);
            if (isNaN(quantity) || quantity < 0) {
              throw new Error(`Invalid quantity value on line ${lineIndex + 2}`);
            }
            prop.quantity = quantity;
            break;
        }
      });
      
      return prop;
    });
    
    return props;
    
  } catch (error) {
    alert(`Error parsing CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return [];
  }
}