function templateBody(id, nome, qtdVendas, posicao) {

    return `
    <tr>
        <td>
            ${nome}
        </td>
        <td>
            ${qtdVendas}
        </td>
        <td>
            Posição (1o)
        </td>
    </tr>
    `;
}