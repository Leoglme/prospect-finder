find all street map éléments
=> garder uniquement de côté les éléments pas encore sauvegarder (osm_id) elementsNotSaved
=> deuxième filtre pour garder uniquement de côté ceux qui ont un tags.name elementsNotSavedWithName
=> deuxième filtre pour garder uniquement de côté ceux qui ont un tags.name elementsWithName

=> save in db elementsNotSaved
=> filtrer elementsWithName pour ne garder que ceux qui sont dans la table prospects
=> filtrer elementsWithName pour ne garder que ceux qui ne sont pas dans la table emails_sents
  
   => filtrer elementsWithName et garder uniquement ceux qui n'ont pas de site web ou email
   => scraper les éléments restants pour récupérer les emails et sites web

return elementsWithName



const filteredElements: OpenStreetMapElement[] = response.data.elements.filter(
(element: OpenStreetMapElement): boolean =>
element.tags.name !== undefined && element.tags.name !== ''
)

      // Limit to exactly 'limit' elements (for example, 20)
      return filteredElements.slice(0, limit) || []
