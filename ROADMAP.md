# Roadmap

Ce qui reste à faire une fois le jeu stable (affichage PixiJS et physique propre).

## Plus tard

- [ ] **Synchronisation générique des vues.** Écrire une seule fois la synchro (retirer ce qui a disparu, créer ce qui manque, mettre à jour le reste), sans qu'elle sache ce qu'elle synchronise. Une classe de vue par type d'objet (`BallView`, puis `TrapView`, projectiles...) qui sait créer / mettre à jour / détruire l'affichage d'un objet, toutes derrière une même interface. Ajouter un type d'objet = écrire une nouvelle vue, sans toucher au reste.
- [ ] **Les armes.** Chaque arme est un enfant du container de sa balle, avec sa propre rotation (dessinée décalée par rapport à l'origine, puis on tourne le container). L'angle de l'arme appartient au **modèle** (la physique en a besoin pour détecter les coups), la vue ne fait que le recopier. Si la forme change (arme qui s'allonge), jouer sur `scale` ou redessiner le `Graphics` (avec `clear`) seulement quand la valeur change.
- [ ] **Changer de renderer en plein combat** (Canvas 2D ⇄ PixiJS). Le moteur reçoit son renderer par injection. Piège : un même `<canvas>` ne peut avoir qu'un seul type de contexte (2D ou WebGL), une fois obtenu.
