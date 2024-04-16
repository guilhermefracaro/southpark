function fetchCharacters(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao acessar a API. Código de resposta: ' + response.status)
            }
            return response.json()
        })
        .then(data => {
            const charactersContainer = document.getElementById('characters-container')

            if (data && data.data) {
                const charactersData = data.data

                charactersData.forEach(character => {
                    const card = document.createElement('div')
                    card.classList.add('character-card')

                    card.innerHTML = `
              <h3>${character.name ? character.name : 'Unknown'}</h3>
              <p>sex: ${character.sex ? character.sex : 'Unknown'}</p>
              <p>age: ${character.age ? character.age : 'Unknown'}</p>
              <p>occupation: ${character.occupation ? character.occupation : 'Unknown'}</p>
              <p>religion: ${character.religion ? character.religion : 'Unknown'}</p>
            `

                    charactersContainer.appendChild(card)
                })

                if (data.links && data.links.next) {

                    fetchCharacters(data.links.next)
                }
            } else {
                console.log('Não há dados de personagens na resposta da API.')
            }
        })
        .catch(error => {
            console.error('Erro ao acessar a API:', error)
        })
}


fetchCharacters('https://spapi.dev/api/characters/')