let selectedVacancy = []

function renderVacancieCards(list) {

    let vacancieList = document.getElementById("vacancie-list")

    vacancieList.innerHTML = ""

    list.forEach((object) => {

        let vacancieCard = vacancieCardTemplate(object)

        vacancieList.appendChild(vacancieCard)
    })
}

renderVacancieCards(jobsData)

function vacancieCardTemplate(vacancieObject) {

    let { id, title, enterprise, location, descrition, modalities: [first, second] } = vacancieObject

    let vacancieCard = document.createElement("li")
    let vacancieTitle = document.createElement("h2")
    let vacancieBoxTop = document.createElement("div")
    let boxTopEnterprise = document.createElement("p")
    let boxTopLocation = document.createElement("p")
    let vacancieDescription = document.createElement("p")
    let vacancieBoxBottom = document.createElement("div")
    let boxBottomModalities1 = document.createElement("p")
    let boxBottomModalities2 = document.createElement("p")
    let applyButton = document.createElement("button")
    let contentBottom = document.createElement("div")

    vacancieCard.classList = "vacancie-card flex"
    vacancieTitle.classList = "title4 textBlack"
    vacancieBoxTop.classList = "flex vacancie-top"
    boxTopEnterprise.classList = "text3 textBlack"
    boxTopLocation.classList = "text3 textBlack"
    vacancieDescription.classList = "text2 textBlack"
    vacancieBoxBottom.classList = "flex vacancie-card-bottom"
    boxBottomModalities1.classList = "modality text3 textBlack"
    boxBottomModalities2.classList = "modality text3 textBlack"
    applyButton.classList = "btt-little-default "
    contentBottom.classList = "flex content-bottom"

    vacancieCard.id = id
    applyButton.id = `button_${id}`

    vacancieTitle.innerText = title
    boxTopEnterprise.innerText = enterprise
    boxTopLocation.innerText = location
    vacancieDescription.innerText = descrition
    boxBottomModalities1.innerText = first
    boxBottomModalities2.innerText = second
    applyButton.innerText = "Candidatar"

    applyButton.addEventListener("click", () => {

        let notFoundItem = selectedVacancy.find((item) => item.id === id)

        if (!notFoundItem) {

            applyButton.innerText = "Remover candidatura"

            selectedVacancy.push(vacancieObject)
            renderSelectedVacancy(selectedVacancy)

            let jsonList = JSON.stringify(selectedVacancy)
            localStorage.setItem("vacancy-list", jsonList)
        } else {

            let selectedItem = document.getElementById(`card_${id}`)
            let index = selectedVacancy.indexOf(vacancieObject)

            selectedItem.remove()

            selectedVacancy.splice(index, 1)
            applyButton.innerText = "Candidatar"

            renderSelectedVacancy(selectedVacancy)

            let jsonList = JSON.stringify(selectedVacancy)
            localStorage.setItem("vacancy-list", jsonList)
        }
    })

    vacancieBoxTop.append(boxTopEnterprise, boxTopLocation)
    vacancieBoxBottom.append(boxBottomModalities1, boxBottomModalities2)
    contentBottom.append(vacancieBoxBottom, applyButton)
    vacancieCard.append(vacancieTitle, vacancieBoxTop, vacancieDescription, contentBottom)

    return vacancieCard
}

function renderSelectedVacancy(list) {

    let selectedList = document.getElementById("selected-list")

    selectedList.innerHTML = ""

    if (list.length > 0) {

        list.forEach((object) => {

            let card = selectedCardTemplate(object)

            selectedList.appendChild(card)
        })
    } else {

        let emptyCard = document.createElement("li")
        let paragraph = document.createElement("p")

        paragraph.classList = "text2 textBlack"

        paragraph.innerText = "Você ainda não aplicou para nenhuma vaga"

        emptyCard.appendChild(paragraph)
        selectedList.append(emptyCard)
    }
}

renderSelectedVacancy(selectedVacancy)

function selectedCardTemplate(selectedObject) {

    let { id, title, enterprise, location } = selectedObject

    let vacancyCard = document.createElement("li")
    let vacancyBoxTop = document.createElement("div")
    let vacancyTitle = document.createElement("h2")
    let trashButton = document.createElement("button")
    let vacancyBoxBottom = document.createElement("div")
    let vacancyEnterprise = document.createElement("p")
    let vacancyLocation = document.createElement("p")

    vacancyCard.classList = "selected-vacancy-card"
    vacancyBoxTop.classList = "flex selected-vacancie-top"
    vacancyTitle.classList = "title5 titleBlack selected-vacancie-title"
    trashButton.classList = "btt-trash"
    vacancyBoxBottom.classList = "flex selected-vacancie-bottom"
    vacancyEnterprise.classList = "text3 textBlack"
    vacancyLocation.classList = "text3 textBlack"

    vacancyCard.id = `card_${id}`

    vacancyTitle.innerText = title
    vacancyEnterprise.innerText = enterprise
    vacancyLocation.innerText = location

    trashButton.addEventListener("click", (event) => {

        let actualCard = event.path[2]
        let index = selectedVacancy.indexOf(selectedObject)
        let applyButton = document.getElementById(`button_${id}`)

        applyButton.innerText = "Candidatar"

        selectedVacancy.splice(index, 1)
        actualCard.remove()

        renderSelectedVacancy(selectedVacancy)

        let jsonList = JSON.stringify(selectedVacancy)
        localStorage.setItem("vacancy-list", jsonList)
    })

    vacancyBoxTop.append(vacancyTitle, trashButton)
    vacancyBoxBottom.append(vacancyEnterprise, vacancyLocation)
    vacancyCard.append(vacancyBoxTop, vacancyBoxBottom)

    return vacancyCard
}

function takeLocalStorage() {

    let localStorageList = localStorage.getItem("vacancy-list")

    if (localStorageList) {

        let vacancyList = JSON.parse(localStorageList)

        vacancyList.forEach((item) => {

            let itemButton = document.getElementById(`button_${item.id}`)

            itemButton.innerText = "Remover candidatura"

            selectedVacancy.push(item)
        })

        renderSelectedVacancy(vacancyList)
    }
}

takeLocalStorage()