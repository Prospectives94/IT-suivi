---
stepsCompleted: [step-01-init, step-02-discovery, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish]
inputDocuments:
  - planning-artifacts/product-brief-formation-2026-01-30.md
workflowType: 'prd'
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
classification:
  projectType: "Web Application + PWA"
  domain: "IT Service Management / Helpdesk"
  complexity: "Medium"
  projectContext: "greenfield"
  characteristics:
    - "Multi-platform (web + mobile PWA)"
    - "Multi-role (users, technician, management)"
    - "SharePoint integration"
    - "On-premise deployment"
    - "Analytics/Reporting"
---

# Product Requirements Document - IT Ticket Manager

**Author:** Rebeaumickael
**Date:** 2026-01-30

---

## Success Criteria

### User Success

#### 👷 Marc (Utilisateur Final)

| Critère | Métrique | Cible | Mesure |
|---------|----------|-------|--------|
| **Zéro relance** | Tickets sans communication externe | 100% | Tracking des tickets |
| **Notification rapide** | Première mise à jour de statut | < 2 heures | Délai création → première action |
| **Visibilité permanente** | Accès au statut 24/7 | 100% disponibilité | Monitoring |
| **Simplicité** | Temps de création d'un ticket | < 2 minutes | Mesure UX |
| **Satisfaction** | Score NPS post-résolution | > 7/10 | Enquête automatique |

**Moment "Aha!" :** Marc reçoit une notification push sur son téléphone moins de 2 heures après avoir créé son ticket. Il sait que sa demande est prise en compte sans avoir à relancer.

#### 🖥️ Thomas (Technicien IT)

| Critère | Métrique | Cible | Mesure |
|---------|----------|-------|--------|
| **Centralisation totale** | Demandes via plateforme | 100% | Ratio canaux |
| **Zéro perte** | Tickets enregistrés vs demandes | 100% | Audit |
| **Visibilité charge** | Dashboard accessible direction | Oui | Vérification accès |
| **Travail structuré** | Tickets traités par ancienneté | > 80% | Ordre de traitement |
| **Données probantes** | Rapports statistiques générés | Hebdomadaire | Présence rapports |

**Moment "Aha!" :** Thomas ouvre son dashboard le matin et voit TOUS ses tickets triés, avec des statistiques prouvant sa charge réelle.

---

### Business Success

#### 🎯 Objectifs Court Terme (3 mois)

| Objectif | Cible | Critère de Succès |
|----------|-------|-------------------|
| **Adoption complète** | 100% des demandes IT passent par la plateforme | Zéro demande email/téléphone/Teams |
| **Formation réussie** | 100% des utilisateurs formés | Registre de présence |
| **Élimination des tensions** | Zéro escalade hiérarchique liée au suivi IT | Aucun incident remonté |
| **Réduction des doublons** | Zéro ticket dupliqué | Détection doublons |

#### 🚀 Objectifs Moyen Terme (12 mois)

| Objectif | Cible | Critère de Succès |
|----------|-------|-------------------|
| **Efficacité opérationnelle** | Réduction de 50% du TMR | Baseline vs actuel |
| **Données RH** | Justification embauche technicien(s) | Rapports charge présentés |
| **Satisfaction globale** | NPS utilisateurs > 7/10 | Enquête trimestrielle |
| **ROI prouvé** | Réduction temps perdu documentée | Calcul impact productivité |

---

### Technical Success

| Critère | Cible | Motivation |
|---------|-------|------------|
| **Temps de réponse** | < 2 secondes | UX fluide, pas de frustration |
| **Disponibilité** | 99.9% uptime | Service IT critique |
| **Compatibilité navigateurs** | Chrome, Edge, Safari | Parc machines varié |
| **PWA fonctionnelle** | Installation + offline reading | Chantiers avec réseau instable |
| **Sécurité** | Authentification sécurisée | Données confidentielles |
| **Scalabilité** | Support 500+ utilisateurs | Croissance future |

---

### Measurable Outcomes

| Outcome | Baseline (Avant) | Target (Après) | Délai |
|---------|------------------|----------------|-------|
| Temps moyen de première réponse | N/A (pas mesuré) | < 2 heures | M+1 |
| Tickets sans relance | ~10% (estimation) | 100% | M+3 |
| Temps moyen de résolution | N/A (pas mesuré) | Baseline -50% | M+12 |
| Demandes perdues | ~5% (estimation) | 0% | M+1 |
| Escalades hiérarchiques | Fréquent | 0 | M+3 |

---

## Product Scope

### MVP - Minimum Viable Product

**Critère MVP :** Le minimum pour que Marc puisse créer un ticket et que Thomas puisse le traiter de manière structurée.

| Module | Fonctionnalités MVP |
|--------|---------------------|
| **Utilisateur** | Création ticket, suivi statut, notifications, historique |
| **Technicien** | Dashboard, tri date, gestion statuts, commentaires, priorisation manuelle |
| **Analytics** | TMR, volume, tickets en retard, dashboard direction |
| **Technique** | PWA, standalone + SharePoint, déploiement interne |

### Growth Features (Post-MVP)

**v2.0 - Multi-Utilisateurs & Automation (6-12 mois)**

| Fonctionnalité | Valeur Ajoutée |
|----------------|----------------|
| Gestion multi-techniciens | Répartition charge, assignation |
| Rapports automatiques | Gain de temps, reporting régulier |
| Intégration email entrante | Création tickets par email |
| SLA & alertes escalade | Qualité de service garantie |

### Vision (Future)

**v3.0 - Intelligence & Self-Service (12-24 mois)**

| Fonctionnalité | Valeur Ajoutée |
|----------------|----------------|
| IA catégorisation | Automatisation, cohérence |
| Base de connaissances | Self-service, réduction tickets |
| Chatbot | Résolution automatique récurrents |
| Multi-tenant | Commercialisation SaaS BTP |

---

## User Journeys

### 👷 Parcours 1 : Marc - Création de Ticket (Happy Path)

**Persona :** Marc, 45 ans, administrateur sur un chantier BTP, compétences IT limitées

#### 🔴 Scène d'Ouverture (Avant IT Ticket Manager)
Marc est au bureau du chantier, son imprimante refuse d'imprimer un bon de commande urgent. Il envoie un email à support@entreprise.fr, puis attend. Aucune réponse après 2 heures. Il rappelle par téléphone - messagerie. Il envoie un message Teams. Toujours rien. Frustré, il crie "THOMAS !" dans le couloir en espérant que quelqu'un relaye. Le bon de commande part avec 4 heures de retard, le fournisseur est mécontent.

#### 🟢 Parcours avec IT Ticket Manager

| Étape | Action | Ressenti |
|-------|--------|---------|
| **Découverte du problème** | Imprimante ne fonctionne pas | Frustration initiale |
| **Ouverture de l'app** | Ouvre IT Ticket Manager sur son téléphone (PWA) | "C'est rapide à ouvrir" |
| **Création du ticket** | Remplit : "Imprimante bureau chantier - n'imprime plus" + catégorie Matériel + Urgence Haute | < 2 minutes |
| **Confirmation** | Reçoit confirmation "Ticket #127 créé" | Soulagement |
| **Notification** | Reçoit push "Thomas a pris en charge votre demande" en < 2h | "Enfin, je sais que c'est vu !" |
| **Suivi** | Consulte le statut : "En cours - Thomas arrive dans 30 min" | Sérénité |
| **Résolution** | Notification "Ticket résolu - Cartouche remplacée" | Satisfaction |

**Moment Aha! :** Marc n'a pas eu besoin de relancer une seule fois. Il savait exactement où en était sa demande.

---

### 👷 Parcours 2 : Marc - Urgence Critique (Edge Case)

**Scénario :** PC de Marc ne démarre plus, présentation client dans 1 heure

#### 🔴 Avant IT Ticket Manager
Marc panique. Il appelle Thomas directement sur son portable personnel. Thomas est en intervention sur un autre site. Marc court au siège, interrompt Thomas en pleine résolution d'un autre problème. Chaos total, stress maximum, tension entre Marc et Thomas.

#### 🟢 Avec IT Ticket Manager

| Étape | Action | Système |
|-------|--------|--------|
| **Création urgente** | Ticket avec urgence "Critique" + description contexte | Le ticket apparaît en rouge en haut du dashboard Thomas |
| **Alerte push** | Thomas reçoit notification sonore spéciale | "Ticket CRITIQUE - Marc - PC ne démarre pas - Présentation dans 1h" |
| **Évaluation** | Thomas voit le contexte et la deadline | Priorise en connaissance de cause |
| **Communication** | Thomas commente "J'arrive dans 15 min, prépare un PC de prêt au siège" | Marc reçoit la notification et se rassure |
| **Résolution** | PC de prêt configuré, présentation sauvée | Marc note 10/10 en satisfaction |

**Révélation Requirement :** Nécessité d'un système de priorité urgente avec alertes différenciées.

---

### 👷 Parcours 3 : Marc - Problème Récurrent (Edge Case)

**Scénario :** Le même logiciel plante pour la 3ème fois ce mois-ci

#### 🔴 Avant IT Ticket Manager
Marc re-contacte Thomas. Thomas ne se souvient pas des interventions précédentes. Il refait le même diagnostic depuis le début. Perte de temps pour tous.

#### 🟢 Avec IT Ticket Manager

| Étape | Action | Bénéfice |
|-------|--------|--------|
| **Création ticket** | Marc crée un nouveau ticket | Système détecte des tickets similaires récents |
| **Historique visible** | Thomas voit "3 tickets similaires en 30 jours" | Comprend que c'est un problème récurrent |
| **Pattern identifié** | Thomas consulte l'historique des résolutions | Évite de refaire le même diagnostic |
| **Résolution définitive** | Thomas identifie la cause racine et documente | Commentaire "Mise à jour logiciel nécessaire - planifié" |
| **Suivi proactif** | Marc voit "Résolution définitive prévue le 15/02" | Comprend le plan |

**Révélation Requirement :** Historique des tickets par utilisateur + détection de patterns récurrents.

---

### 🖥️ Parcours 4 : Thomas - Journée Type (Happy Path)

**Persona :** Thomas, 32 ans, technicien IT unique, gère 250 utilisateurs

#### 🔴 Scène d'Ouverture (Avant IT Ticket Manager)
Thomas arrive le lundi matin. 47 emails non lus. 12 messages Teams. 3 post-its sur son écran. 2 collègues l'attendent à la porte. Son téléphone sonne. Il ne sait pas par où commencer. Il passe 2 heures à trier les demandes, à identifier les doublons, à comprendre ce qui est urgent. Il se sent submergé, incompris, invisible.

#### 🟢 Parcours avec IT Ticket Manager

| Horaire | Action | Dashboard |
|---------|--------|-----------|
| **08:30** | Ouvre le dashboard | 15 tickets triés par ancienneté, 2 marqués "Critique" en rouge |
| **08:35** | Traite les 2 critiques en premier | Change statut → "En cours", envoie un commentaire |
| **09:00** | Traite les tickets par ordre d'ancienneté | Check visible du temps d'attente de chaque ticket |
| **12:00** | Pause déjeuner avec 8 tickets résolus | Dashboard montre la progression |
| **17:00** | Fin de journée, consulte les stats | "12 tickets résolus, TMR: 3h, 0 tickets en retard" |
| **Vendredi** | Génère le rapport hebdomadaire | Données pour la réunion avec la direction |

**Moment Aha! :** Thomas voit tous ses tickets sur un seul écran et peut prouver sa charge de travail avec des chiffres.

---

### 🖥️ Parcours 5 : Thomas - Pic de Demandes (Edge Case)

**Scénario :** Lundi matin après une panne réseau du week-end, 35 tickets d'un coup

#### 🔴 Avant IT Ticket Manager
Thomas "se met en PLS sous son bureau" (citation). Impossible de tout gérer. Pas de visibilité sur ce qui est vraiment urgent. La direction lui demande "Ça avance ?" sans comprendre l'ampleur du problème.

#### 🟢 Avec IT Ticket Manager

| Action | Résultat |
|--------|----------|
| Dashboard affiche 35 tickets | Vue claire, triable, pas d'emails à trier |
| Tri par ancienneté + urgence | Les plus anciens et critiques en premier |
| Statistiques temps réel | "35 tickets, charge estimée: 3 jours" |
| Communication direction | Sophie et Pierre voient le dashboard : preuve visuelle de la surcharge |
| Gestion méthodique | Thomas traite sans stress, tout est tracé |

**Révélation Requirement :** Estimation de charge de travail + visibilité direction en temps réel.

---

### 🖥️ Parcours 6 : Thomas - Besoin de Clarification (Edge Case)

**Scénario :** Ticket "Ça marche pas" sans détails

#### 🔴 Avant IT Ticket Manager
Thomas envoie un email pour demander des précisions. L'email reste en "non lu" pendant des heures. Il envoie un Teams. Pas de réponse. Il appelle. Pas de réponse. Ticket bloqué.

#### 🟢 Avec IT Ticket Manager

| Étape | Action | Résultat |
|-------|--------|----------|
| **Lecture ticket** | Thomas voit "Ça marche pas - Logiciel X" | Pas assez de détails |
| **Commentaire** | Ajoute "Pouvez-vous préciser le message d'erreur ?" | Le statut passe à "En attente info" |
| **Notification Marc** | Marc reçoit push "Thomas demande des précisions" | Marc répond directement dans l'app |
| **Reprise** | Thomas reçoit notification de réponse | Continue le traitement |

**Révélation Requirement :** Système de commentaires bidirectionnel avec notifications.

---

### 📊 Parcours 7 : Sophie (CFO) - Consultation Statistiques

**Persona :** Sophie, Directrice Financière, besoin de données pour décisions RH

#### Parcours avec IT Ticket Manager

| Étape | Action | Valeur |
|-------|--------|--------|
| **Accès dashboard** | Ouvre le dashboard direction (lecture seule) | Vue globale sans interaction |
| **Consultation KPIs** | Voit TMR, volume, tickets en retard | Données factuelles |
| **Analyse tendance** | Graphique charge sur 3 mois | Identifie que charge > 80% depuis 2 mois |
| **Décision** | Présente au COMEX "Nous avons besoin d'un 2ème technicien" | Données probantes |

**Moment Aha! :** Sophie peut justifier un investissement RH avec des données concrètes, pas des "on dit".

---

## Journey Requirements Summary

### Capacités Révélées par les Parcours

| Capacité | Parcours Source | Priorité |
|----------|-----------------|----------|
| Création ticket simple (< 2 min) | Marc #1 | MVP |
| Notifications push temps réel | Marc #1, #2 | MVP |
| Dashboard tickets trié | Thomas #4 | MVP |
| Gestion des statuts | Thomas #4, #6 | MVP |
| Système de commentaires | Thomas #6 | MVP |
| Priorisation urgence | Marc #2 | MVP |
| Historique par utilisateur | Marc #3 | MVP |
| Statistiques dashboard direction | Sophie #7, Thomas #5 | MVP |
| Détection patterns récurrents | Marc #3 | v2.0 |
| Estimation charge de travail | Thomas #5 | v2.0 |

### Besoins Non-Fonctionnels Révélés

| Besoin | Source | Criticité |
|--------|--------|----------|
| Accès mobile (PWA) | Marc sur chantier | Haute |
| Notifications push fiables | Tous parcours | Haute |
| Interface simple | Marc (faible IT) | Haute |
| Performance < 2s | UX globale | Haute |

---

## Web Application Specific Requirements

### Project-Type Overview

**IT Ticket Manager** est une application web MPA (Multi-Page Application) avec PWA (Progressive Web App) pour l'accès mobile. L'application combine une interface web traditionnelle avec des fonctionnalités PWA pour permettre l'installation sur mobile et le fonctionnement en mode offline limité.

**Architecture Choisie :**

| Aspect | Décision | Justification |
|--------|----------|---------------|
| **Type d'application** | MPA (Multi-Page Application) | Simplicité, SEO natif, maintenance facilitée |
| **PWA** | Oui | Installation mobile, notifications push, accès offline basique |
| **Authentification** | SharePoint SSO (option) + Standalone | Flexibilité déploiement |
| **Déploiement** | Serveur interne on-premise | Contrainte entreprise |

---

### Technical Architecture Considerations

#### Browser Compatibility Matrix

| Navigateur | Version Minimum | Support | Notes |
|------------|-----------------|---------|-------|
| **Chrome** | 90+ | ✅ Complet | Navigateur principal |
| **Edge** | 90+ | ✅ Complet | Chromium-based |
| **Safari** | 14+ | ✅ Complet | Important pour iOS PWA |
| **Firefox** | 88+ | ✅ Complet | Alternative Linux/privacy |
| **IE11** | N/A | ❌ Non supporté | Obsolète |

**Politique de Support :** 2 dernières versions majeures de chaque navigateur.

---

#### Responsive Design Requirements

| Breakpoint | Largeur | Usage Principal |
|------------|---------|-----------------|
| **Mobile** | < 768px | PWA sur chantier (Marc) |
| **Tablet** | 768px - 1024px | Usage mixte |
| **Desktop** | > 1024px | Dashboard Thomas, Statistiques Sophie |

**Mobile-First :** L'interface utilisateur (création ticket, suivi) est conçue mobile-first pour les utilisateurs terrain.

**Desktop-Optimized :** Le dashboard technicien et les statistiques sont optimisés pour écran large.

---

#### Performance Targets

| Métrique | Cible MVP | Cible v2 | Mesure |
|----------|-----------|----------|--------|
| **Time to First Byte (TTFB)** | < 500ms | < 200ms | Lighthouse |
| **First Contentful Paint (FCP)** | < 2s | < 1.5s | Lighthouse |
| **Time to Interactive (TTI)** | < 3s | < 2s | Lighthouse |
| **Largest Contentful Paint (LCP)** | < 2.5s | < 2s | Core Web Vitals |
| **Cumulative Layout Shift (CLS)** | < 0.1 | < 0.05 | Core Web Vitals |

**Contrainte Réseau :** Optimiser pour connexions instables (chantiers ruraux).

---

#### SEO Strategy

| Phase | Approche SEO | Justification |
|-------|--------------|---------------|
| **MVP (Interne)** | Minimal | Application interne, pas indexée |
| **v2+ (Public)** | Complet | Préparation commercialisation SaaS |

**Préparation SEO (dès MVP) :**
- URLs propres et descriptives (`/tickets/123`, `/dashboard`)
- Balises meta-title et meta-description sur chaque page
- Structure HTML sémantique (header, main, nav, footer)
- Sitemap XML (désactivé en MVP, prêt pour v2)

---

#### Accessibility Level (WCAG 2.1 AA)

**Engagement :** Conformité WCAG 2.1 Niveau AA pour toutes les fonctionnalités MVP.

| Critère WCAG | Exigence | Impact IT Ticket Manager |
|--------------|----------|------------------------|
| **1.1.1 Non-text Content** | Alt text sur toutes les images | Icônes de statut, avatars |
| **1.4.3 Contrast Minimum** | Ratio 4.5:1 texte, 3:1 éléments UI | Palette couleurs à valider |
| **2.1.1 Keyboard** | Navigation clavier complète | Dashboard, formulaires |
| **2.4.4 Link Purpose** | Liens explicites | Boutons d'action clairs |
| **3.3.1 Error Identification** | Erreurs identifiées clairement | Formulaire création ticket |
| **4.1.2 Name, Role, Value** | Composants accessibles | ARIA labels |

**Outils de Validation :** Lighthouse (score cible > 90), axe DevTools

---

### Implementation Considerations

#### PWA Requirements

| Fonctionnalité PWA | MVP | v2 | Notes |
|--------------------|-----|-----|-------|
| **Installation (Add to Home Screen)** | ✅ | ✅ | Manifest.json |
| **Notifications Push** | ✅ | ✅ | Service Worker + Push API |
| **Offline Reading** | ✅ | ✅ | Cache statiques + derniers tickets |
| **Offline Create** | ❌ | ✅ | Sync background (complexe) |
| **Auto-refresh** | ✅ | ✅ | Polling toutes les 30 secondes |

#### Refresh Strategy

| Stratégie | Implémentation |
|-----------|----------------|
| **Auto-refresh Dashboard** | Polling API toutes les 30 secondes |
| **Pull-to-refresh (Mobile)** | Geste natif PWA |
| **Notification Push** | Alertes importantes (nouveau ticket urgent, changement statut) |
| **Indicateur de fraîcheur** | "Dernière mise à jour : il y a 30 secondes" |

---

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**Approche MVP :** Problem-Solving MVP
> Résoudre le problème central (pas de suivi, relances multiples) avec le minimum de fonctionnalités qui rendent l'outil utilisable et meilleur que l'existant.

**Critère de Succès MVP :** Marc peut créer un ticket et suivre son statut. Thomas peut voir tous les tickets sur un dashboard et les traiter.

**Ressources :**

| Aspect | Valeur |
|--------|--------|
| **Équipe** | 1 développeur (solo) |
| **Timeline MVP** | 1 semaine |
| **Contrainte clé** | Simplicité extrême pour respecter le délai |

---

### MVP Feature Set (Phase 1)

**Deadline :** 1 semaine

#### Core User Journeys Supportés

| Parcours | Inclus MVP ? | Notes |
|----------|--------------|-------|
| Marc - Création ticket (happy path) | ✅ | Essentiel |
| Marc - Urgence critique | ⚠️ Simplifié | Priorisation manuelle seulement |
| Marc - Problème récurrent | ❌ v2 | Historique visible mais pas de détection pattern |
| Thomas - Journée type | ✅ | Essentiel |
| Thomas - Pic de demandes | ✅ | Dashboard + tri |
| Thomas - Clarification | ✅ | Commentaires bidirectionnels |
| Sophie - Statistiques | ⚠️ Simplifié | KPIs basiques seulement |

#### Must-Have Capabilities (1 semaine)

**Module Utilisateur :**
- [ ] Formulaire création ticket (titre, description, catégorie, urgence)
- [ ] Liste "Mes tickets" avec statut visible
- [ ] Notifications push basiques (changement statut)
- [ ] PWA installable

**Module Technicien :**
- [ ] Dashboard liste tous les tickets
- [ ] Tri par date (plus ancien en premier)
- [ ] Changement de statut (Nouveau → En cours → Résolu → Fermé)
- [ ] Ajout de commentaires
- [ ] Marquage priorité (toggle urgent)

**Module Analytics (Simplifié) :**
- [ ] Compteur tickets ouverts / en cours / résolus
- [ ] Temps moyen de résolution (calcul simple)
- [ ] Liste tickets > 48h sans action

**Fonctionnalités EXCLUES du MVP (report v2) :**
- ❌ Statut "En attente info" (utiliser commentaires à la place)
- ❌ Historique détaillé par utilisateur
- ❌ Graphiques et tendances
- ❌ Export de rapports
- ❌ Notifications email (push seulement)
- ❌ Pièces jointes

---

### Post-MVP Features

#### Phase 2 : Amélioration (1-2 mois après MVP)

| Fonctionnalité | Valeur Ajoutée |
|----------------|----------------|
| Statut "En attente info" | Workflow plus précis |
| Historique utilisateur complet | Contexte pour Thomas |
| Graphiques statistiques | Visualisation pour direction |
| Notifications email | Utilisateurs sans smartphone |
| Pièces jointes | Screenshots d'erreurs |
| Export Excel/PDF | Rapports formels |

#### Phase 3 : Expansion (3-6 mois après MVP)

| Fonctionnalité | Valeur Ajoutée |
|----------------|----------------|
| Multi-techniciens | Support équipe IT grandissante |
| Assignation automatique | Répartition charge |
| SLA et alertes | Qualité de service |
| Rapports automatiques | Gain de temps hebdomadaire |
| Détection patterns | Problèmes récurrents |

#### Phase 4 : Vision Long Terme (6-12 mois)

| Fonctionnalité | Valeur Ajoutée |
|----------------|----------------|
| IA catégorisation | Automatisation |
| Base de connaissances | Self-service |
| Multi-tenant | Commercialisation SaaS |
| Chatbot | Résolution automatique |

---

### Risk Mitigation Strategy

#### Risque Principal : Adoption (UX complexe, app lourde)

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| **UX trop complexe** | Moyenne | Haute | Formulaire création ticket < 4 champs, 1 clic pour soumettre |
| **App trop lourde** | Basse | Haute | PWA légère, pas de frameworks lourds, lazy loading |
| **Utilisateurs n'adoptent pas** | Moyenne | Haute | Formation obligatoire, support direction |

#### Critères de Légèreté

| Métrique | Cible MVP | Mesure |
|----------|-----------|--------|
| **Taille bundle JS** | < 200 KB | Build analysis |
| **Taille totale PWA** | < 500 KB | Network tab |
| **Champs formulaire création** | ≤ 4 champs | UX review |
| **Clics pour créer un ticket** | ≤ 3 clics | UX testing |

---

### Validation MVP

**Critères de "Done" pour le MVP :**

- [ ] Marc peut créer un ticket en < 2 minutes
- [ ] Marc reçoit une notification quand le statut change
- [ ] Thomas voit tous les tickets sur un dashboard
- [ ] Thomas peut changer le statut et commenter
- [ ] Les stats basiques sont visibles
- [ ] L'app fonctionne sur Chrome, Edge, Safari, Firefox
- [ ] La PWA est installable sur mobile
- [ ] Temps de réponse < 2 secondes

---

## Functional Requirements

### Gestion des Tickets (Utilisateur)

- FR1: L'utilisateur peut créer un nouveau ticket avec titre, description, catégorie et niveau d'urgence
- FR2: L'utilisateur peut voir la liste de tous ses tickets
- FR3: L'utilisateur peut voir le statut actuel de chaque ticket
- FR4: L'utilisateur peut voir l'historique des commentaires sur ses tickets
- FR5: L'utilisateur peut ajouter un commentaire à un ticket existant
- FR6: L'utilisateur reçoit une notification push quand le statut d'un de ses tickets change
- FR7: L'utilisateur reçoit une notification push quand un commentaire est ajouté à son ticket

### Gestion des Tickets (Technicien)

- FR8: Le technicien peut voir tous les tickets du système sur un dashboard
- FR9: Le technicien peut trier les tickets par date de création (plus ancien en premier)
- FR10: Le technicien peut filtrer les tickets par statut
- FR11: Le technicien peut modifier le statut d'un ticket (Nouveau, En cours, Résolu, Fermé)
- FR12: Le technicien peut ajouter un commentaire à un ticket
- FR13: Le technicien peut marquer un ticket comme urgent/prioritaire
- FR14: Le technicien peut voir les détails complets d'un ticket

### Statistiques & Analytics

- FR15: Le système affiche le nombre de tickets par statut (compteurs)
- FR16: Le système calcule et affiche le temps moyen de résolution
- FR17: Le système affiche la liste des tickets sans action depuis plus de 48h
- FR18: La direction peut consulter les statistiques en lecture seule

### Notifications

- FR19: Le système envoie des notifications push aux utilisateurs concernés
- FR20: Les notifications sont affichées sur mobile via la PWA
- FR21: L'utilisateur peut voir si le technicien a pris en charge sa demande

### Authentification & Accès

- FR22: L'utilisateur peut se connecter à l'application (mode standalone)
- FR23: L'utilisateur peut se connecter via SharePoint SSO (mode intégré)
- FR24: Le système distingue les rôles utilisateur/technicien/direction
- FR25: L'accès aux fonctionnalités est restreint selon le rôle

### Interface & PWA

- FR26: L'application est installable comme PWA sur mobile
- FR27: L'application affiche les dernières données consultées en mode offline (lecture)
- FR28: L'application fonctionne sur Chrome, Edge, Safari et Firefox
- FR29: L'interface s'adapte aux écrans mobile, tablet et desktop

---

## Non-Functional Requirements

### Performance

| NFR | Critère | Mesure |
|-----|---------|--------|
| NFR1 | Temps de chargement initial | < 3 secondes (FCP) |
| NFR2 | Temps de réponse actions utilisateur | < 2 secondes |
| NFR3 | Temps de rafraîchissement dashboard | < 1 seconde (polling) |
| NFR4 | Taille bundle JS | < 200 KB gzippé |
| NFR5 | Taille PWA complète | < 500 KB |

### Sécurité

| NFR | Critère | Mesure |
|-----|---------|--------|
| NFR6 | Authentification | Sessions sécurisées avec expiration |
| NFR7 | Mots de passe | Hashage bcrypt (ou équivalent) |
| NFR8 | HTTPS | Obligatoire pour toutes les communications |
| NFR9 | Contrôle d'accès | Rôles séparés (utilisateur/technicien/direction) |
| NFR10 | Données sensibles | Pas de stockage de mots de passe utilisateurs en clair |

### Fiabilité

| NFR | Critère | Mesure |
|-----|---------|--------|
| NFR11 | Disponibilité | 99.9% uptime (heures ouvrées) |
| NFR12 | Récupération erreur | Messages d'erreur explicites, pas de crash silencieux |
| NFR13 | Persistance données | Transactions atomiques, pas de perte de tickets |
| NFR14 | Mode dégradé | Affichage lecture seule si problème serveur |

### Accessibilité (WCAG 2.1 AA)

| NFR | Critère | Mesure |
|-----|---------|--------|
| NFR15 | Contraste texte | Ratio 4.5:1 minimum |
| NFR16 | Navigation clavier | Tous les éléments interactifs accessibles |
| NFR17 | Lecteurs d'écran | ARIA labels sur composants personnalisés |
| NFR18 | Score Lighthouse Accessibility | > 90 |

### Compatibilité

| NFR | Critère | Mesure |
|-----|---------|--------|
| NFR19 | Navigateurs desktop | Chrome 90+, Edge 90+, Safari 14+, Firefox 88+ |
| NFR20 | Navigateurs mobile | Safari iOS 14+, Chrome Android |
| NFR21 | Responsive | Fonctionnel de 320px à 2560px largeur |
| NFR22 | PWA | Installable, notifications push fonctionnelles |

### Intégration

| NFR | Critère | Mesure |
|-----|---------|--------|
| NFR23 | SharePoint SSO | Authentification transparente via OAuth2/SAML |
| NFR24 | Mode standalone | Fonctionnel sans dépendance SharePoint |
| NFR25 | API | RESTful, réponses JSON |

### Maintenabilité

| NFR | Critère | Mesure |
|-----|---------|--------|
| NFR26 | Code documenté | Commentaires sur fonctions complexes |
| NFR27 | Déploiement | Processus de déploiement < 10 minutes |
| NFR28 | Logs | Erreurs loggées pour debugging |
