//INICIALIZANDO
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

//Helpers
//[get_id(id)] -> retorna elemento selecionado pelo 'id'
function get_id(id){
  return document.getElementById(id);
}
//[create(elem)] -> cria e retorna um novo elemento do tipo 'elem'
function create(elem){
  return document.createElement(elem);
}
//[validade(value)] -> retorna TRUE se o valor for diferente de NULL ou não for vazio
function validate(value){
  console.log(value);
  if(value != null && value != ''){
    return true;
  }else{
    return false;
  }
}
//[clear_inputs()] -> limpa o valor de todos os inputs do sistema
function clear_inputs(){
  $('input').each(function(){
    this.value = '';
  });
  get_id('input_obs').value = '';
}

//Emite uma mensagem de aviso caso o usuário tente fechar a página
window.onbeforeunload = function(e) {
    return 'Ao fechar a janela todos os dados serão perdidos!';
};

//Click do botão de adicionar registro para focar no input de data
function btn_add_register_click(){
  console.log('focando data...');
  get_id('input_data').focus();
  get_id('input_data').select();
}

//Função do click do botão do modal de adição
/*
possui dois modos: 'add' e 'edit'

no modo 'add' adiciona um novo registro na tabel a partir do que foi inserido no
formulário do modal.

no modo 'edit' acessa a linha com id 'edit_this_row' e altera seus valores para 
os valores do formulário do modal. Depois remove o id dessa linha e altera o modo do
formulário de volta para 'add' ( o formulário entra em modo 'edit' através do click do botão de edição de cada registro ).
*/
function modal_submit_click(elem){
  event.preventDefault();
  //Validando entradas
  var numero_sitio = get_id('input_numero_sitio').value;
  var nome_sitio = get_id('input_nome_sitio').value;
  var numero_catalogo = get_id('input_numero_catalogo').value;
  var localidade = get_id('input_localidade').value;
  var municipio = get_id('input_municipio').value;
  var tipo = get_id('input_tipo').value;
  var data = get_id('input_data').value;
  var obs = get_id('input_obs').value;
  //Verificando modo
  var modo = elem.getAttribute('data-modal-mode');
  //Acessando tabela principal ( tbody )
  var table = get_id('main_tbody');
  switch(modo){
    case 'add':
      //Criando nova linha
      var new_row = create('tr');
      //Criando colunas
      var col_numero_sitio = create('td');
      var col_nome_sitio = create('td');
      var col_numero_catalogo = create('td');
      var col_localidade = create('td');
      var col_municipio = create('td');
      var col_tipo = create('td');
      var col_data = create('td');
      var col_obs = create('td');
      var col_edit = create('td');
      //Inserindo valores nas colunas
      col_numero_sitio.innerHTML = numero_sitio;
      col_nome_sitio.innerHTML = nome_sitio;
      col_numero_catalogo.innerHTML = numero_catalogo;
      col_localidade.innerHTML = localidade;
      col_municipio.innerHTML = municipio;
      col_tipo.innerHTML = tipo;
      var res = data.substr(8,2)+'/'+data.substr(5,2)+'/'+data.substr(0,4);
      col_data.innerHTML = res;
      col_obs.innerHTML = obs;
      //Permitindo que o texto quebre nas colunas
      col_numero_sitio.classList.add('text-truncate');
      col_nome_sitio.classList.add('text-truncate');
      col_numero_catalogo.classList.add('text-truncate');
      col_localidade.classList.add('text-truncate');
      col_municipio.classList.add('text-truncate');
      col_tipo.classList.add('text-truncate');
      col_data.classList.add('text-truncate');
      col_obs.classList.add('text-truncate');
      //O botão de edição executa a função 'edit_button_click(elem)' passando como 'elem' ele mesmo
      //O botão de deletar executa a função 'edit_button_click(elem)' passando como 'elem' ele mesmo
      col_edit.innerHTML = "<button onclick='edit_button_click(this)' class='btn btn-outline-primary btn-sm'><i class='fa fa-edit'></i></button>" + '&nbsp;&nbsp;' + "<button onclick='delete_button_click(this)' class='btn btn-outline-danger btn-sm'><i class='fa fa-trash'></i></button>";
      //Jogando a coluna de ações para a direita
      col_edit.classList.add('float-right');
      col_edit.style.width = '100%';
      //Inserindo colunas na linha
      new_row.appendChild(col_numero_sitio);
      new_row.appendChild(col_nome_sitio);
      new_row.appendChild(col_numero_catalogo);
      new_row.appendChild(col_localidade);
      new_row.appendChild(col_municipio);
      new_row.appendChild(col_tipo);
      new_row.appendChild(col_data);
      new_row.appendChild(col_obs);
      new_row.appendChild(col_edit);
      //Inserindo nova linha na tabela
      table.appendChild(new_row);
    break;
    case 'edit':
      //Acessando linha que vai ser alterada
      var row = get_id('edit_this_row');
      //Alterando colunas
      row.childNodes[0].innerHTML = get_id('input_numero_sitio').value;
      row.childNodes[1].innerHTML = get_id('input_nome_sitio').value;
      row.childNodes[2].innerHTML = get_id('input_numero_catalogo').value;
      row.childNodes[3].innerHTML = get_id('input_localidade').value;
      row.childNodes[4].innerHTML = get_id('input_municipio').value;
      row.childNodes[5].innerHTML = get_id('input_tipo').value;
      var data = get_id('input_data').value;
      var res = data.substr(8,2)+'/'+data.substr(5,2)+'/'+data.substr(0,4);
      row.childNodes[6].innerHTML = res;
      row.childNodes[7].innerHTML = get_id('input_obs').value;
      //Removendo id da linha
      row.id = '';
      //Voltando modo do formulário para 'add'
      get_id('form').setAttribute('data-modal-mode','add');
      //Fechando formulário
      $('#modalAdicionarRegistros').modal('hide');
      //Habilitando alteração do numero de catalogo
      get_id('input_numero_catalogo').disabled = false;
      //Alterando texto do formulário para Adicionar
      get_id('btn_modal_submit').innerHTML = 'Adicionar';
      //Limpando os valores
      clear_inputs();
    break;
  }
}

//Função do clique do botão de editar registros
function edit_button_click(elem){
  //Acessando linha do click
  var row = elem.parentNode.parentNode;
  //Atribuindo id para a linha que vai ser afetada
  row.id = 'edit_this_row';
  row.classList.add('table-primary');
  //Mudando modo de execução do formulário
  get_id('form').setAttribute('data-modal-mode','edit');
  //Alterando titulo para editar
  get_id('modal_adicionar_registro_title').innerHTML = 'Editar registro';
  get_id('modal_adicionar_registro_title').classList.add('text-primary');
  //Inserindo valores nos inputs
  get_id('input_numero_sitio').value = row.childNodes[0].innerHTML;
  get_id('input_nome_sitio').value = row.childNodes[1].innerHTML;
  get_id('input_numero_catalogo').value = row.childNodes[2].innerHTML;
  get_id('input_localidade').value = row.childNodes[3].innerHTML;
  get_id('input_municipio').value = row.childNodes[4].innerHTML;
  get_id('input_tipo').value = row.childNodes[5].innerHTML;
  var data = row.childNodes[6].innerHTML;
  if(data.length > 8){
    var res = data.substr(6,4)+'-'+data.substr(3,2)+'-'+data.substr(0,2);
  }else{
    if(parseInt(data.substr(6,1)) > 2){
      var res = '19'+data.substr(6,2)+'-'+data.substr(3,2)+'-'+data.substr(0,2);
    }else{
      var res = '20'+data.substr(6,2)+'-'+data.substr(3,2)+'-'+data.substr(0,2);
    }
  }
  get_id('input_data').value = res;
  get_id('input_obs').value = row.childNodes[7].innerHTML;
  //Desabilitando alteração do numero de catalogo
  get_id('input_numero_catalogo').disabled = true;
  //Alterando texto do botão para 'Salvar'
  get_id('btn_modal_submit').innerHTML = 'Salvar';
  //Abrindo modal
  $('#modalAdicionarRegistros').modal('show');
}

//Caso o usuário feche o formulário
function btn_modal_close_click(){
    //Acessando coluna a ser editada
    var row = get_id('edit_this_row');
    //Removendo id da linha
    if(row){
      row.id = '';
      row.classList.remove('table-primary');
    }
    //Alterando titulo para adicionar
    get_id('modal_adicionar_registro_title').innerHTML = 'Adicionar registro';
    get_id('modal_adicionar_registro_title').classList.remove('text-primary');
    //Voltando modo do formulário para 'add'
    get_id('form').setAttribute('data-modal-mode','add');
    //Fechando formulário
    $('#modalAdicionarRegistros').modal('hide');
    //Habilitando alteração do numero de catalogo
    get_id('input_numero_catalogo').disabled = false;
    //Alterando texto do formulário para Adicionar
    get_id('btn_modal_submit').innerHTML = 'Adicionar';
    //Limpando os valores
    clear_inputs();
}

//Quando o usuário fechar o modal '#modalAdicionarRegistros' clicando fora dele
$('#modalAdicionarRegistros').on('hidden.bs.modal', function () {
  btn_modal_close_click();
});

//Função de limpar toda a tabela
function clear_table(){
  //Altera o conteúdo do corpo da tabela para vazio
  get_id('main_tbody').innerHTML = '';
  //Fecha o formulário de apagar dados
  $('#modalApagarDados').modal('hide');
  //Fecha o menu principal
  $('.navbar-collapse').collapse('hide');
}

//Abre o modal de confirmar deletar
function delete_button_click(elem){
  //Acessando linha a ser deletada e marcando-a
  var row = elem.parentNode.parentNode;
  row.id = 'delete_this_row';
  row.classList.add('table-danger');
  //Prepara o modal para mostrar mensagem de confirmação
  get_id('modal_delete_row_numero_catalogo').innerHTML = row.childNodes[2].innerHTML;
  get_id('modal_delete_row_data').innerHTML = row.childNodes[6].innerHTML;
  //Abrindo modal
  $('#modalApagarRegistro').modal('show');
}

//Confirmação do modal de deletar
function modal_delete_row_submit_click(){
  //Acessando linha a ser deletada
  var row = get_id('delete_this_row');
  //Apagando linha
  row.remove();
  //Fechando modal de deletar
  $('#modalApagarRegistro').modal('hide');
}

$("*[id^='filter']").keyup(function(){
  var rows = get_id('main_tbody').childNodes;
  var target_col = this.getAttribute('data-target-col');
  if(this.value == '' || this.value == null){
    for(var i = 1; i < rows.length; i++){
      $(rows[i]).show();
    }
  }else{
    for(var i = 1; i < rows.length; i++){
      var col = rows[i].childNodes[target_col];
      if(col.innerHTML.includes(this.value)){
        $(rows[i]).show();
      }else{
        $(rows[i]).hide();
      }
    }
  }
});

$("*[id^='input_']").keyup(function(event){
  event.preventDefault();
  var key = event.key;
  var selected = document.activeElement;
  var tab_code = selected.getAttribute('data-tab-code');
  var form = tab_code.substr(0,1);
  var value = tab_code.substr(1,2);
  var row = parseInt(value.substr(0,1));
  var col = parseInt(value.substr(1,1));
  var target = '';
  switch(key){
    case 'ArrowLeft':
      if(row < 2){
        if(col > 0){
          col -= 1;
        }else{
          col = 3;
        }
      }
    break;
    case 'ArrowRight':
      if(row < 2){
        if(col < 3){
          col += 1;
        }else{
          col = 0;
        }
      }
    break;
    case 'ArrowDown':
      if(row == 1 && (col >= 1)){
        row = 2;
        col = 0;
      }else if(row < 2){
        row += 1;
      }
    break;
    case 'ArrowUp':
      if(row > 0){
        row -= 1;
      }
    break;
  }
  target = form + row.toString() + col.toString();
  console.log(target);
  $('[data-tab-code="'+target+'"]').focus();
});

//Quando o usuário fechar o modal '#modalAdicionarRegistros' clicando fora dele
$('#modalApagarRegistro').on('hidden.bs.modal', function () {
  //Acessando linha a ser deletada
  var row = get_id('delete_this_row');
  row.classList.remove('table-danger');
  //Removendo marcação
  row.id = '';
});

//Exportar tabela
function export_table() {
  var csv = [];
  var rows = document.querySelectorAll("tbody tr");
  for (var i = 0; i < rows.length; i++) {
    var row = [], cols = rows[i].querySelectorAll("td, th");
      for (var j = 0; j < cols.length; j++) 
        row.push(cols[j].innerText);
      csv.push(row.join(","));        
  }
  download_CSV(csv.join("\n"), 'arqueoEXPLORER_data.csv');
}

//Baixar arquivo CSV
function download_CSV(csv, filename){
  var csvFile;
  var downloadLink;
  // CSV file
  csvFile = new Blob([csv], {type: "text/csv"});
  // Download link
  downloadLink = document.createElement("a");
  // File name
  downloadLink.download = filename;
  // Create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);
  // Hide download link
  downloadLink.style.display = "none";
  // Add the link to DOM
  document.body.appendChild(downloadLink);
  // Click download link
  downloadLink.click();
}

//Importar tabela
function upload_csv() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      console.log(typeof (FileReader));
      if (typeof (FileReader) != "undefined") {
        var reader = new FileReader();
        reader.onload = function (e) {
          var table = get_id('main_tbody');
          var rows = e.target.result.split("\n");
          for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].split(",");
            if (cells.length > 1) {
              var row = table.insertRow(-1);
              var j = 0;
              for (var j = 0; j <= 7; j++) {
                var cell = row.insertCell(-1);
                cell.classList.add('text-truncate');
                if(cells[j]){
                  cell.innerHTML = cells[j];
                }
              }
              var col_edit = row.insertCell(-1);
              col_edit.innerHTML = "<button onclick='edit_button_click(this)' class='btn btn-outline-primary btn-sm'><i class='fa fa-edit'></i></button>" + '&nbsp;&nbsp;' + "<button onclick='delete_button_click(this)' class='btn btn-outline-danger btn-sm'><i class='fa fa-trash'></i></button>";
            }
          }
        }
        reader.readAsText(fileUpload.files[0]);
      } else {
        alert("Erro, tente utilizar outro navegador!");
      }
    } else {
      alert("O arquivo enviado não é do tipo CSV.");
    }
}
