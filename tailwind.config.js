/* Tailwind CSS IntelliSense를 위한 설정파일 */

module.exports = {
  content: ["./html/*.html"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1168px",
        xl: "1168px"
      },
      padding: {
        DEFAULT: "16px",
        sm: "16px",
        md: "16px",
        lg: "0px",
        xl: "0px"
      }
    },
    extend: {
      colors: {
        'primary': '#D03B83',
        'black111': '#111',
        'gray400': '#D8D8D8',
        'gray600': '#666',
        'gray700': '#333',
        'pink300': '#E7A3C4',
      },
    }
  },
}
