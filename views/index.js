const btnAddField = document.getElementById('addFieldBtn');
const tableForm = document.getElementById('tableForm')
const addRecordForm= document.getElementById('addRecordForm');
const createTableBtn = document.getElementById('createTable');
const main = document.getElementById('main');
const tableListDiv = document.getElementById('table-list');

const mainContent = main.innerHTML;



document.addEventListener('DOMContentLoaded',getAllTablesApi);
btnAddField.addEventListener('click',addField);
tableForm.addEventListener('submit',createTable);
addRecordForm.addEventListener('submit',addRecord);
createTableBtn.addEventListener('click',renderCreateTable)
// document.addEventListener('DOMContentLoaded',()=>
// {
//   const tableList = document.getElementsByClassName('tableList')
//   console.log(tableList);
//   tableList.addEventListener('click',()=>console.log('click'))
//   Array.from(tableList).forEach(item=>{item.addEventListener('click',getTableData)})
// }
// );

function renderCreateTable(){
  main.innerHTML=mainContent;
  document.getElementById('addFieldBtn').addEventListener('click',addField);
  document.getElementById('tableForm').addEventListener('submit',createTable);
  // tableForm.addEventListener('submit',createTable);
  // btnAddField.addEventListener('click',addField);
}

function addField(e){
    const inputDiv = document.getElementById('field-div')
    const typeDiv = document.getElementById('type-div')

    const inputField = '<input type="text" class="form-control mb-2 fieldName" placeholder="Enter Field Name" name="field">';
    const selectField = ` <select class="form-select mb-2 typeName" aria-label="Default select example">
    <option selected>Select Type</option>
    <option value="text">STRING</option>
    <option value="int">INTEGER</option>
    <option value="double">DOUBLE</option>
    <option value="boolean">BOOLEAN</option>

  </select>`

    inputDiv.insertAdjacentHTML('beforeend',inputField);
    typeDiv.insertAdjacentHTML('beforeend',selectField);
}

function createTable(e){
  e.preventDefault();
  const Table ={
    tableName:null,
    columns:[]
  }
    const tableName = document.getElementById('tableName').value
    const fieldValue = Array.from(document.getElementsByClassName('fieldName'));
    const typeValue = Array.from(document.getElementsByClassName('typeName'));
    
      Table.tableName = tableName;
      for(let i=0;i<fieldValue.length;i++){
        Table.columns.push({columnName:fieldValue[i].value,columnType:typeValue[i].value})
      }

      if(Table.tableName && Table.columns.length>0){

         createTableApi(Table);
        
         this.reset();
      }
      else{

        alert('Enter Table Details')
      }


}

function createTableList(table){
  
  const div = document.createElement('div');
  const tableList = `<a href="/database/getTableData/${table}" class="tableList list-group-item list-group-item-action bg-light p-2 mb-2 rounded">${table}<i class="fa-sharp fa-solid fa-trash delete float-end" style="color:red"></i></a>`;
  div.innerHTML=tableList;
  
  div.addEventListener('click',getTableData)
  // tableList.addEventListener('click',getTableData)
  // tableListDiv.insertAdjacentHTML('beforeend',tableList)
  tableListDiv.appendChild(div)

}

function getTableData(e){
  e.preventDefault();
  
  if(e.target.classList.contains('delete')){
    // dropTable()
    const link =e.target.parentElement.href;
    const dropLink=link.replace('getTableData','dropTable');
    
    dropTableApi(dropLink);
    
    
  }
  else{

    getTableDataApI(e.target.href);
  }
 
}

function generateTable(tableName,tableData,columns){
addFormModal(tableName,columns)
 const inserBtn = document.createElement('button');
 inserBtn.textContent='Insert Record';
 inserBtn.className='btn btn-success';
 inserBtn.setAttribute('data-bs-toggle','modal');
 inserBtn.setAttribute('data-bs-target','#tableModal')

 

const table = document.createElement('table');
table.className='table table-striped table-hover';

const header = document.createElement('thead');
for(const key of columns){
  const th = document.createElement('th');
  th.textContent= key;
  header.appendChild(th);
 
  
}

// const tableNameInput = document.createElement('div').innerHTML=`<input class='form-control mb-2' type='hidden'  name=tableName value=${tableName} >`
// addRecordForm.insertAdjacentHTML('beforeend',tableNameInput)
table.appendChild(header);

const tbody = document.createElement('tbody');
tableData.forEach(item=>{
  const row = document.createElement('tr');
  for(const key in item){
    var box = document.createElement('td');
    box.textContent= item[key];
    row.appendChild(box)
    
    
  }
  // box.innerHTML= '<button class="btn btn-danger">Delete</button>'
  //   row.appendChild(box)'
  const td = document.createElement('td');
  
  const deleteBtn = `<button class="btn btn-danger btn-sm" id=${item.id} tableName=${tableName}>Delete</button>`;
  td.innerHTML=deleteBtn;
  td.children[0].addEventListener('click',deleteRecord)
  row.appendChild(td);
  tbody.appendChild(row)
})
table.appendChild(tbody)
 
const main = document.getElementById('main');
main.innerHTML='';
main.appendChild(inserBtn)
main.appendChild(table)

}

function addFormModal(tableName,column){
  const elements =addRecordForm.children;
addRecordForm.innerHTML=''
// Array.from(elements).forEach(element=>addRecordForm.remove(element))
  
  for(let key of column){
    if(key !=='id'){

      const inputDiv =document.createElement('div');
      inputDiv.innerHTML=`<input class='form-control mb-2' name=${key} placeholder=${key} required>`;
     
      addRecordForm.appendChild(inputDiv)
     
  
    }
  }
  const btn= document.createElement('div');
btn.innerHTML='<button type="submit" class="btn btn-primary" id="addRecordBtn" data-bs-dismiss="modal">Add Record</button>'
addRecordForm.appendChild(btn)
addRecordForm.setAttribute('tableName',tableName);

}

function addRecord(e){
  e.preventDefault();
 
  const record =[];
  const tableName= e.target.getAttribute('tableName');
  

const input =addRecordForm.querySelectorAll('input');
input.forEach((input)=>record.push({columnName:input.name,value:input.value}));
 addRecordApi(tableName,record);
//  input.forEach((input)=>input.value='')
}

function deleteRecord(e){
deleteRecordApi(e.target.getAttribute('tableName'),e.target.id)
}





// APIS
async function createTableApi(TableObj){
  try {
    const {data}=await axios.post('/database/createTable',TableObj);
    tableListDiv.innerHTML='';
    for(let table of data){
      createTableList(table['Tables_in_database_mangement'])
    }
  } catch (error) {

    alert(error.response.data.error);

  }
}

async function addRecordApi(tableName,record){
  try {
   const {data}= await axios.post('/database/addRecord',{tableName,record});
  //  const inputForm =addRecordForm.getElementsByTagName('input');
  // Array.from(inputForm).forEach(element=>addRecordForm.remove(element))
   generateTable(data.tableName,data.tableData,data.columns)
  } catch (error) {
    alert(error.response.data.error);
  }

}


async function deleteRecordApi(tableName,id){
  try {
    const {data} = await axios.post('/database/deleteRecord',{tableName,id});
    
    generateTable(data.tableName,data.tableData,data.columns);
  } catch (error) {
    alert(error.response.data.error);
  }
}




async function getAllTablesApi(){
  try {
    const {data} = await axios.get('/database/getAllTables');
    
    for(let table of data){
      createTableList(table['Tables_in_database_mangement'])
    }
  } catch (error) {
    alert(error.response.data.error);
  }
}

async function getTableDataApI(url){
  try {
    const {data} = await axios.get(url);
    generateTable(data.tableName,data.tableData,data.columns)
  } catch(error){

    alert(error.response.data.error);
  }
}

async function dropTableApi(url){
  try {
    const {data}=await axios.post(url);
    tableListDiv.innerHTML='';
    for(let table of data){
      createTableList(table['Tables_in_database_mangement'])
    }
  } catch (error) {
    alert(error.response.data.error)
  }
}