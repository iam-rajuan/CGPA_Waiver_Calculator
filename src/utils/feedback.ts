export const getFeedbackMessage = (cgpa: number): string => {
  if (cgpa >= 3.75) return "Outstanding performance—keep up the excellent work!";
  if (cgpa >= 3.50) return "Great job—you're doing very well and can aim even higher!";
  if (cgpa >= 3.25) return "Good work—stay consistent, and you'll continue to improve!";
  if (cgpa >= 3.00) return "Decent effort—focus on your weak areas to boost your results!";
  if (cgpa >= 2.75) return "Fair progress—put in more effort to achieve better results!";
  return "You have potential—work harder and seek help to improve!";
};