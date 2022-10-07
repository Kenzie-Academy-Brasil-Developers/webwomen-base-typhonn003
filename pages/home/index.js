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
    let appplyButton = document.createElement("button")

    vacancieCard.classList = "vacancie-card flex"
    vacancieTitle.classList = "title4 textBlack"
    vacancieBoxTop.classList = "flex vacancie-top"
    boxTopEnterprise.classList = "text3 textBlack"
    boxTopLocation.classList = "text3 textBlack"
    vacancieDescription.classList = "text2 textBlack"
    vacancieBoxBottom.classList = "flex vacancie-card-bottom"
    boxBottomModalities1.classList = "modality text3 textBlack"
    boxBottomModalities2.classList = "modality text3 textBlack"
    appplyButton.classList = "btt-little-default"

    vacancieCard.id = id
    appplyButton.id = `button_${id}`

    vacancieTitle.innerText = title
    boxTopEnterprise.innerText = enterprise
    boxTopLocation.innerText = location
    vacancieDescription.innerText = descrition
    boxBottomModalities1.innerText = first
    boxBottomModalities2.innerText = second
    appplyButton.innerText = "Candidatar"

    appplyButton.addEventListener("click", () => {

        let notFoundItem = selectedVacancy.find((item) => item.id === id)

        if (!notFoundItem) {

            appplyButton.innerText = "Remover candidatura"

            selectedVacancy.push(vacancieObject)
            renderSelectedVacancy(selectedVacancy)
        } else {

            let selectedItem = document.getElementById(`card_${id}`)
            let index = selectedVacancy.indexOf(vacancieObject)

            selectedItem.remove()

            selectedVacancy.splice(index, 1)
            appplyButton.innerText = "Candidatar"

            renderSelectedVacancy(selectedVacancy)
        }
    })

    vacancieBoxTop.append(boxTopEnterprise, boxTopLocation)
    vacancieBoxBottom.append(boxBottomModalities1, boxBottomModalities2)
    vacancieCard.append(vacancieTitle, vacancieBoxTop, vacancieDescription, vacancieBoxBottom, appplyButton)

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
        let appplyButton = document.getElementById(`button_${id}`)

        appplyButton.innerText = "Candidatar"

        selectedVacancy.splice(index, 1)
        actualCard.remove()

        renderSelectedVacancy(selectedVacancy)
    })

    vacancyBoxTop.append(vacancyTitle, trashButton)
    vacancyBoxBottom.append(vacancyEnterprise, vacancyLocation)
    vacancyCard.append(vacancyBoxTop, vacancyBoxBottom)

    return vacancyCard
}