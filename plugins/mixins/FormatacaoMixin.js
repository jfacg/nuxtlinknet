
const mymixins = {
  methods: {
    formataCpf (cpf) {
      const cpfOriginal = cpf
      let cpfFormatado = ''

      cpfFormatado = cpfOriginal.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
        function (regex, argumento1, argumento2, argumento3, argumento4) {
          return `${argumento1}.${argumento2}.${argumento3}-${argumento4}`
        })

      return cpfFormatado
    },

    formataCell (cell) {
      const cpfOriginal = cell
      let cellFormatado = ''

      cellFormatado = cpfOriginal.replace(/(\d{2})(\d{5})(\d{4})/,
        function (regex, argumento1, argumento2, argumento3) {
          return `(${argumento1}) ${argumento2}-${argumento3}`
        })

      return cellFormatado
    }

  }
}

export default mymixins
