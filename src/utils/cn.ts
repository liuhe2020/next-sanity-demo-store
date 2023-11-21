export default function cn(...classes: (string | boolean)[]) {
  return classes
    .filter(Boolean)
    .map((className) => {
      if (typeof className === 'boolean' && className) {
        return 'true';
      } else {
        return className;
      }
    })
    .join(' ');
}
