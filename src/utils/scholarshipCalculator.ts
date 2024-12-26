export const calculateScholarshipPercentage = (sscGpa: number, hscGpa: number): number => {
    const combinedGpa = (sscGpa + hscGpa) / 2;
    
    if (combinedGpa >= 5.0) return 30;
    if (combinedGpa >= 4.5) return 20;
    if (combinedGpa >= 4.0) return 15;
    if (combinedGpa >= 3.5) return 10;
    return 0;
  };