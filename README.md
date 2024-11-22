
# Home Automation App

## Sobre o Projeto
Este projeto é um aplicativo de automação residencial que permite aos usuários gerenciar cômodos e seus eletrodomésticos. Com uma interface intuitiva, o aplicativo possibilita adicionar, editar e excluir cômodos e eletrodomésticos, além de oferecer uma visão clara do que está sendo controlado em cada ambiente.

### Principais Funcionalidades
- **Adicionar e Remover Cômodos:** Adicione cômodos à sua casa, como Sala, Quarto, Cozinha, etc.
- **Adicionar Eletrodomésticos:** Adicione eletrodomésticos a cada cômodo, como lâmpadas, televisores, e mais.
- **Excluir Itens:** Remova cômodos e eletrodomésticos quando não forem mais necessários.
- **Interface Intuitiva:** Uso de DropDown para selecionar cômodos e exibir os detalhes dos eletrodomésticos.

## Estrutura do Código

### Componentes
O projeto foi dividido em componentes menores para facilitar a manutenção e reutilização de código:

1. **HomeScreen**: É o componente principal que contém toda a lógica e estado do aplicativo.
2. **ComodoDropdown**: Gerencia o DropDown que exibe a lista de cômodos e permite a seleção e exclusão dos mesmos.
3. **EletroItem**: Representa um eletrodoméstico dentro de um cômodo, exibindo seu nome e permitindo a edição.
4. **ModalInput**: Um modal reutilizável para adicionar novos cômodos e eletrodomésticos.

### Tecnologias Utilizadas
- **React Native**: Para construção da interface e lógica do aplicativo.
- **Expo**: Para facilitar o desenvolvimento e o carregamento de fontes personalizadas.
- **AsyncStorage**: Para salvar e carregar dados localmente no dispositivo do usuário.
- **Ionicons**: Para ícones usados na interface, como os botões de excluir.

## Como Usar
### Instalação
1. Clone este repositório.
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto e instale as dependências.
   ```bash
   cd nome-do-projeto
   npm install
   ```
3. Inicie o aplicativo usando o Expo.
   ```bash
   npx expo start
   ```

### Utilizando o Aplicativo
- Ao abrir o aplicativo, você verá uma saudação e poderá adicionar novos cômodos à sua casa.
- Clique em **"Adicionar Cômodo"** para adicionar um novo cômodo.
- Uma vez que o cômodo seja adicionado, você pode selecioná-lo e adicionar eletrodomésticos.
- Você pode também excluir cômodos e eletrodomésticos usando o ícone de **lixeira** ao lado de cada item.

### Estrutura do Código
- **HomeScreen**: Função principal onde os estados globais como `comodos`, `selectedComodoId`, etc., são gerenciados. A tela principal exibe os cômodos e seus detalhes.
- **Dropdown**: Gerenciado pelo componente `ComodoDropdown` que lida com a exibição e seleção dos cômodos.
- **Eletrodomésticos**: Cada eletrodoméstico é exibido usando o componente `EletroItem`. 
- **Modal de Entrada**: Usado tanto para adicionar cômodos quanto eletrodomésticos (`ModalInput`).

### Problemas Conhecidos
- **Erros de Estado Nulo**: Certifique-se de que o `comodoId` nunca seja `undefined` ao passar como argumento para funções. Pode-se prevenir isso verificando antes de chamar métodos como `handleRemoveComodo`.
- **Layout de Modal Melhorável**: Os modais de entrada para adicionar cômodos e eletrodomésticos precisam ser melhorados para oferecer uma experiência de usuário mais clara.

## Melhorias Futuras
- **Validação de Entrada**: Adicionar validações mais robustas ao adicionar novos cômodos e eletrodomésticos.
- **Persistência na Nuvem**: Substituir `AsyncStorage` por uma solução baseada em nuvem para permitir sincronização entre dispositivos.
- **Controle de Energia**: Adicionar funcionalidades para controlar o consumo de energia de cada eletrodoméstico.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir **issues** ou enviar um **pull request**.

---

**Autor:** [Seu Nome]

**Licença:** Este projeto está sob a licença MIT.
