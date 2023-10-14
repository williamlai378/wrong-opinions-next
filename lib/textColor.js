

export const averageScoreColor = (score) => {
    switch (true) {
        case (score <= 20): {
            return '#e04d46'
        }
        case (score <= 40): {
            return '#f88538'
        }
        case (score <= 60): {
            return '#f8cb32'
        }
        case (score <= 80): {
            return '#a2cc69'
        }
        case (score <= 100): {
            return '#25b858'
        }
        default: {
            return 'gray'
        }
    }
}

export const averageRatingColor = (score) => {
    switch (true) {
        case (score <= 2): {
            return '#e04d46'
        }
        case (score <= 4): {
            return '#f88538'
        }
        case (score <= 6): {
            return '#f8cb32'
        }
        case (score <= 8): {
            return '#a2cc69'
        }
        case (score <= 10): {
            return '#25b858'
        }
        default: {
            return 'gray'
        }
    }
}

export const statusColor = (status) => {
    switch (status) {
        case ('CURRENT'):
            return '#68D638';
        case ('PLANNING'):
            return '#8CC6EC';
        case ('PAUSED'):
            return '#F779A4';
        case ('DROPPED'):
            return '#8E223A';
        case ('COMPLETED'):
            return '#F4FCAF';

    }
}

export const hexToRgba = (hex, alpha = 1) => {
    // Remove the "#" symbol if present
    hex = hex.replace(/^#/, '');

    // Check if it's a 3-digit or 6-digit hexadecimal color
    if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1'); // Expand shorthand to full form (e.g., "abc" to "aabbcc")
    }

    // Parse the red, green, blue values
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Ensure alpha is between 0 and 1
    alpha = Math.min(1, Math.max(0, alpha));

    // Create and return the RGBA color string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}