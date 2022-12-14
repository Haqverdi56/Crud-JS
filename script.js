const url = "https://northwind.vercel.app/api/suppliers";
const thead = document.getElementById("thead");
const tbody = document.getElementById("tbody");
const companyName = document.getElementById("companyName");
const contactName = document.getElementById("contactName");
const contactTitle = document.getElementById("contactTitleName");
const addSupplier = document.getElementById("addSuppl");

function getUsers() {
    axios.get(url)
    .then(res => {
        console.log(res.data);
        const data = res.data
        data.forEach(el => {
            const tr = document.createElement('tr')
            const th = document.createElement('th')
            const th1 = document.createElement('th')
            const th2 = document.createElement('th')
            const th3 = document.createElement('th')
            const deleteBtn = document.createElement('button')
            const updateBtn = document.createElement('button')
            th.innerText = el.id
            th1.innerText = el.companyName
            th2.innerText = el.contactTitle
            th3.innerText = el.contactName
            deleteBtn.innerText = "Delete"
            updateBtn.innerText = "Update"
            tr.appendChild(th)
            tr.appendChild(th1)
            tr.appendChild(th2)
            tr.appendChild(th3)
            tr.appendChild(deleteBtn)
            tr.appendChild(updateBtn)
            tbody.appendChild(tr)

            deleteBtn.addEventListener('click', function(e){
                document.getElementById('image').style.display = 'block'
                removeElement(e)
            })
            updateBtn.addEventListener('click', function(e){
                updateElement(e)
            })

        })
    })
}

function removeElement(e) {
    // console.log('click', e.target.parentElement.children[0].innerText)
    axios.delete(`${url}/${e.target.parentElement.children[0].innerText}`)
    .then(()=>{
        tbody.innerText = ''
    })
    .then(()=>{
        document.getElementById('image').style.display = 'none'
        getUsers()
    })
}
function updateElement(e) {
    console.log(e.target.parentElement.children[1])
    companyName.value = e.target.parentElement.children[1].innerText;
    contactName.value = e.target.parentElement.children[2].innerText;
    contactTitle.value = e.target.parentElement.children[3].innerText;

    axios.put(`${url}/${e.target.parentElement.parentElement.children[0].children[0].innerText}`);
}
getUsers()

addSupplier.addEventListener('click', () => {
    tbody.innerHTML = ''
    let newCompany = {
      companyName: companyName.value,
      contactName: contactName.value,
      contactTitle: contactTitle.value,
    };
    console.log(newCompany)
    axios.post(url, newCompany).then(() => {
      getUsers();
    });
  
    companyName.value = ' ';
    contactName.value = ' ';
    contactTitle.value = ' ';
  });