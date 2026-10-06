---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: []
date: 2026-01-30
author: Rebeaumickael
---

# Product Brief: IT Ticket Manager

## Executive Summary

**IT Ticket Manager** est une application de gestion de tickets conçue pour structurer et fluidifier la communication entre les utilisateurs et le service IT d'une organisation de taille moyenne (~250 utilisateurs par technicien).

Face à une gestion actuelle chaotique basée sur des canaux dispersés (emails, téléphone, Teams, demandes en personne), l'application apporte une plateforme centralisée offrant transparence, traçabilité et efficacité. Les utilisateurs peuvent créer des tickets et suivre leur statut en temps réel, tandis que les techniciens disposent d'un tableau de bord unifié pour traiter les demandes de manière organisée.

L'objectif principal est double : **réduire la frustration des utilisateurs** qui se sentent délaissés, et **optimiser le temps des techniciens** qui perdent du temps à gérer des demandes éparpillées et des relances répétées.

---

## Core Vision

### Problem Statement

Le service IT fait face à une absence totale de système de suivi structuré. Les demandes arrivent via multiples canaux (email, téléphone, Teams, en personne) sans centralisation ni priorisation. Les utilisateurs doivent relancer plusieurs fois pour obtenir une réponse, créant une frustration croissante et des tensions qui remontent jusqu'à la hiérarchie. Le technicien, submergé par le flux désorganisé, perd du temps précieux à gérer la communication plutôt qu'à résoudre les problèmes.

### Problem Impact

| Partie Prenante | Impact |
|-----------------|--------|
| **Utilisateurs** | Sentiment d'abandon, perte de productivité, tensions avec l'IT |
| **Technicien IT** | Surcharge cognitive, travail réactif plutôt que proactif, pas de visibilité sur la charge |
| **Management** | Aucune donnée pour évaluer la performance ou dimensionner les ressources |
| **Organisation** | Tensions inter-équipes, escalades hiérarchiques fréquentes |

### Why Existing Solutions Fall Short

Aucune solution n'a été déployée à ce jour. L'organisation n'a pas le droit de faire appel à des prestataires externes, et les outils de ticketing standards du marché (Jira, Freshdesk, GLPI) sont souvent perçus comme trop complexes pour une adoption rapide. Le défi est de créer une solution **interne, simple et intégrée à l'écosystème existant (SharePoint)**.

### Proposed Solution

**IT Ticket Manager** - Une application web déployée sur serveur interne comprenant :

**Côté Utilisateurs :**
- Création de tickets simple et rapide
- Suivi en temps réel du statut des demandes
- Historique des tickets soumis

**Côté Service IT :**
- Dashboard centralisé avec toutes les demandes
- Tri par date (du plus ancien au plus récent)
- Gestion des statuts et commentaires pour clarification
- Priorisation manuelle des tickets

**Analytics & Reporting :**
- Temps moyen de résolution
- Nombre de tickets par jour/semaine
- Tickets en retard
- Performance par technicien

**Évolutivité :**
- Architecture prévue pour supporter plusieurs techniciens
- Intégration avec SharePoint

### Key Differentiators

| Différenciateur | Description |
|-----------------|-------------|
| **Simplicité extrême** | Interface minimaliste, adoption instantanée sans formation |
| **Intégration SharePoint** | S'intègre naturellement à l'écosystème Microsoft existant |
| **Déploiement interne** | Hébergé sur serveur interne, conformité et sécurité garanties |
| **Metrics actionables** | Données pour prouver la charge réelle et justifier les besoins en ressources |
| **Scalable** | Prêt pour la croissance future de l'équipe IT |

---

## Target Users

### Primary Users

#### 👷 Persona 1 : Marc, l'Administrateur de Chantier

**Profil :**
- **Rôle :** Administrateur sur un chantier BTP
- **Âge :** 45 ans
- **Compétences IT :** Faibles - utilise l'ordinateur pour l'essentiel (emails, Excel)
- **Environnement :** Bureau sur chantier, souvent interrompu, accès limité à l'ordinateur

**Contexte & Quotidien :**
Marc gère la paperasse administrative d'un chantier de construction. Il utilise son PC principalement pour les emails et les feuilles de calcul. Quand il a un problème informatique (mot de passe oublié, imprimante défaillante, logiciel qui plante), il est bloqué dans son travail. Actuellement, il envoie un email, puis relance par téléphone, puis finit par se déplacer au siège. Il trouve ça frustrant et perd un temps précieux.

**Problème Vécu :**
- Ne sait jamais si sa demande a été prise en compte
- Doit relancer plusieurs fois
- Se sent "abandonné" par le service IT
- Perd du temps et de la productivité

**Vision du Succès :**
"Je crée ma demande en 2 minutes, je reçois une notification quand c'est pris en charge, et je suis informé automatiquement de l'avancement. Plus besoin de relancer !"

**Besoins Clés :**
- Interface ultra-simple (formulaire minimaliste)
- Accès mobile (souvent loin de son bureau)
- Notifications de mise à jour de statut
- Visibilité sur l'historique de ses demandes

---

#### 🖥️ Persona 2 : Thomas, le Technicien IT

**Profil :**
- **Rôle :** Technicien support IT unique
- **Âge :** 32 ans
- **Compétences IT :** Expertes
- **Environnement :** Bureau IT, mais souvent en déplacement sur les chantiers

**Contexte & Quotidien :**
Thomas est seul pour gérer le support de ~250 utilisateurs répartis sur plusieurs sites. Sa journée est fragmentée entre les emails, les appels téléphoniques, les messages Teams et les demandes en personne. Il n'a aucune vue d'ensemble de sa charge de travail et passe son temps à "éteindre des incendies" plutôt qu'à travailler de manière structurée. Il ne peut pas prouver à sa direction qu'il est débordé.

**Problème Vécu :**
- Jongle entre 4 canaux de communication différents
- Perd des demandes dans le flux
- Pas de priorisation claire
- Aucune donnée pour justifier ses besoins en ressources
- Se sent submergé et incompris

**Vision du Succès :**
"J'ouvre mon dashboard le matin, je vois TOUTES mes demandes triées par ancienneté, je traite de manière méthodique, et j'ai des stats qui prouvent ma charge réelle."

**Besoins Clés :**
- Dashboard centralisé avec toutes les demandes
- Tri par date et priorisation manuelle
- Système de commentaires pour clarifier
- Statistiques de performance et de charge

---

### Secondary Users

#### 📊 Persona 3 : Sophie, Directrice Financière

**Profil :**
- **Rôle :** CFO
- **Intérêt :** Contrôle des coûts et allocation des ressources

**Besoins :**
- Vue globale des statistiques IT
- Données pour justifier les investissements (embauche, outils)
- Métriques de performance : temps de résolution, tickets en retard

---

#### 🏭 Persona 4 : Pierre, Directeur des Opérations

**Profil :**
- **Rôle :** COO
- **Intérêt :** Productivité des équipes terrain

**Besoins :**
- Visibilité sur l'impact des problèmes IT sur les opérations
- Suivi de la qualité du service IT
- Statistiques pour optimiser les processus

---

### User Journey

#### Parcours de Marc (Utilisateur Final)

| Étape | Action | Émotion |
|-------|--------|---------|
| **Découverte** | Formation obligatoire lors du déploiement | Curiosité, légère résistance |
| **Première utilisation** | Crée son premier ticket depuis son téléphone | "C'est vraiment simple !" |
| **Moment Aha!** | Reçoit une notification de mise à jour de statut | "Enfin, je sais ce qui se passe !" |
| **Usage régulier** | Consulte l'historique de ses demandes | Confiance, autonomie |
| **Fidélisation** | Ne relance plus jamais par email | Satisfaction, gain de temps |

#### Parcours de Thomas (Technicien IT)

| Étape | Action | Émotion |
|-------|--------|---------|
| **Découverte** | Configuration du système et formation | Espoir, enthousiasme |
| **Première utilisation** | Ouvre le dashboard avec toutes les demandes | "Enfin une vue globale !" |
| **Moment Aha!** | Voit les statistiques de sa charge de travail | "Je peux enfin le prouver !" |
| **Usage régulier** | Traite les tickets méthodiquement par priorité | Sérénité, efficacité |
| **Fidélisation** | Utilise les stats dans ses réunions avec la direction | Reconnaissance, légitimité |

---

## Success Metrics

### User Success Metrics

#### 👷 Marc (Utilisateur Final) - Critères de Succès

| Métrique | Indicateur de Succès | Méthode de Mesure |
|----------|---------------------|-------------------|
| **Zéro relance nécessaire** | Aucun ticket ne nécessite de relance par email/téléphone | Tracking des tickets sans communication externe |
| **Notification rapide** | Première mise à jour de statut reçue en < 4 heures | Délai entre création et première action IT |
| **Visibilité totale** | L'utilisateur peut voir le statut à tout moment | Taux d'utilisation de la page "Mes tickets" |
| **Satisfaction** | Score NPS > 7/10 après résolution | Enquête automatique post-résolution |

#### 🖥️ Thomas (Technicien IT) - Critères de Succès

| Métrique | Indicateur de Succès | Méthode de Mesure |
|----------|---------------------|-------------------|
| **Zéro demande perdue** | 100% des demandes sont enregistrées et tracées | Comparaison avec les canaux historiques |
| **Visibilité de la charge** | Dashboard accessible à la direction | Accès managérial aux statistiques |
| **Travail structuré** | Traitement méthodique par priorité/ancienneté | Réduction du temps moyen de prise en charge |
| **Réduction du stress** | Moins de demandes "urgentes" en doublon | Nombre de tickets dupliqués |

---

### Business Objectives

#### 🎯 Objectifs à 3 Mois (Court Terme)

| Objectif | Cible | Mesure |
|----------|-------|--------|
| **Adoption complète** | 100% des demandes IT passent par la plateforme | Ratio demandes plateforme vs autres canaux |
| **Formation réussie** | 100% des utilisateurs formés | Registre de présence aux sessions |
| **Réduction des tensions** | Zéro escalade hiérarchique liée au suivi IT | Incidents remontés à la direction |

#### 🚀 Objectifs à 12 Mois (Moyen Terme)

| Objectif | Cible | Mesure |
|----------|-------|--------|
| **Efficacité opérationnelle** | Réduction de 50% du temps de résolution moyen | Comparaison baseline vs actuel |
| **Capacité analytique** | Données suffisantes pour justifier les besoins RH | Rapports présentés à la direction |
| **Scalabilité prouvée** | Système prêt pour 2-3 techniciens | Architecture multi-utilisateurs testée |

---

### Key Performance Indicators (KPIs)

#### 📊 KPIs Opérationnels

| KPI | Formule | Fréquence | Cible |
|-----|---------|-----------|-------|
| **Temps moyen de résolution (TMR)** | Somme(heures résolution) / Nombre tickets | Hebdomadaire | Baseline → -50% à 12 mois |
| **Temps de première réponse** | Délai création → première action | Quotidien | < 4 heures |
| **Tickets en retard** | Tickets ouverts > 48h sans action | Quotidien | < 5% du total |
| **Taux de résolution premier contact** | Tickets résolus sans suivi / Total | Mensuel | > 40% |

#### 📈 KPIs de Charge & Capacité

| KPI | Formule | Fréquence | Usage |
|-----|---------|-----------|-------|
| **Volume de tickets** | Nombre de tickets créés | Jour/Semaine/Mois | Dimensionnement équipe |
| **Charge par technicien** | Tickets actifs / Techniciens | Temps réel | Équilibrage de charge |
| **Pic de demandes** | Jour/heure avec le plus de tickets | Mensuel | Planification |
| **Ratio tickets/utilisateurs** | Tickets mensuels / Utilisateurs actifs | Mensuel | Benchmark |

#### 🎯 KPIs Stratégiques (pour CFO/COO)

| KPI | Formule | Fréquence | Usage |
|-----|---------|-----------|-------|
| **Capacité saturée** | Charge > 80% sur 4 semaines consécutives | Mensuel | Justification embauche |
| **Coût par ticket** | (Salaire IT + Outils) / Total tickets | Trimestriel | Optimisation budget |
| **Impact productivité** | Heures perdues avant résolution × coût horaire | Trimestriel | ROI du service IT |

---

## MVP Scope

### Core Features

#### 👤 Module Utilisateur

| Fonctionnalité | Description | Priorité |
|----------------|-------------|----------|
| **Création de ticket** | Formulaire simple : titre, description, catégorie (Matériel/Logiciel/Accès), urgence | P0 - Essentiel |
| **Suivi des tickets** | Page "Mes tickets" avec liste et statut en temps réel | P0 - Essentiel |
| **Notifications** | Alertes push/email lors de changement de statut | P0 - Essentiel |
| **Historique** | Consultation des tickets passés et leurs résolutions | P0 - Essentiel |
| **Accès mobile (PWA)** | Application web progressive pour utilisation sur chantier | P0 - Essentiel |

#### 🖥️ Module Technicien IT

| Fonctionnalité | Description | Priorité |
|----------------|-------------|----------|
| **Dashboard centralisé** | Vue unique de tous les tickets actifs | P0 - Essentiel |
| **Tri par ancienneté** | Affichage du plus ancien au plus récent | P0 - Essentiel |
| **Gestion des statuts** | Nouveau → En cours → En attente → Résolu → Fermé | P0 - Essentiel |
| **Commentaires** | Ajout de notes et demandes de clarification | P0 - Essentiel |
| **Priorisation manuelle** | Marquage des tickets urgents/importants | P0 - Essentiel |

#### 📊 Module Analytics (Basique)

| Fonctionnalité | Description | Priorité |
|----------------|-------------|----------|
| **Temps moyen de résolution** | Calcul automatique par période | P0 - Essentiel |
| **Volume de tickets** | Comptage par jour/semaine/mois | P0 - Essentiel |
| **Tickets en retard** | Alertes sur tickets > 48h sans action | P0 - Essentiel |
| **Dashboard statistiques** | Vue accessible au CFO/COO | P0 - Essentiel |

#### 🔧 Technique

| Fonctionnalité | Description | Priorité |
|----------------|-------------|----------|
| **Mode Standalone** | Fonctionne sans intégration SharePoint | P0 - Essentiel |
| **Intégration SharePoint** | Option d'authentification et stockage SharePoint | P0 - Essentiel |
| **Déploiement interne** | Hébergement sur serveur de l'entreprise | P0 - Essentiel |
| **PWA** | Progressive Web App installable sur mobile | P0 - Essentiel |

---

### Out of Scope for MVP

| Fonctionnalité | Raison du Report | Version Cible |
|----------------|------------------|---------------|
| **Gestion multi-techniciens** | Complexité d'assignation et répartition de charge | v2.0 |
| **Rapports automatiques** | Valeur ajoutée, mais non critique au démarrage | v2.0 |
| **Intégration email entrante** | Création de tickets par email | v2.0 |
| **IA de catégorisation** | Nécessite données d'entraînement (tickets historiques) | v3.0 |
| **Chatbot** | Complexité technique, gain après base de connaissances | v3.0 |
| **Base de connaissances** | Dépend de l'accumulation de résolutions documentées | v3.0 |
| **Application native mobile** | PWA suffisante pour MVP | Optionnel |

---

### MVP Success Criteria

#### 🎯 Critères de Validation MVP

| Critère | Cible | Délai | Mesure |
|---------|-------|-------|--------|
| **Adoption complète** | 100% des tickets IT passent par la plateforme | 1 mois | Zéro demande par email/téléphone/Teams |
| **Formation effectuée** | 100% des utilisateurs formés | Déploiement | Registre de formation |
| **Stabilité technique** | < 1% de downtime | 1 mois | Monitoring serveur |
| **Satisfaction utilisateur** | Retours positifs de Marc et Thomas | 1 mois | Entretiens/enquête |

#### 🚦 Décision Go/No-Go vers v2

| Condition | Résultat |
|-----------|----------|
| Critères MVP validés + retours positifs | ✅ Go v2.0 |
| 6 mois écoulés (même si critères partiels) | ✅ Go v2.0 avec ajustements |
| Adoption < 50% après 2 mois | ⚠️ Investigation et pivot |

---

### Future Vision

#### 🛤️ Roadmap Produit

**v2.0 - Multi-Utilisateurs & Automation (6-12 mois)**
- Gestion multi-techniciens (assignation, répartition)
- Rapports automatiques hebdomadaires/mensuels
- Intégration email entrante (création de tickets par email)
- SLA et alertes d'escalade

**v3.0 - Intelligence & Self-Service (12-24 mois)**
- IA de catégorisation automatique des tickets
- Base de connaissances (FAQ, résolutions documentées)
- Chatbot pour résolution automatique des problèmes récurrents
- Suggestions de solutions basées sur l'historique

**Vision Long Terme (2-3 ans)**
- **Produit commercialisable** pour entreprises BTP similaires
- Multi-tenant pour héberger plusieurs clients
- Marketplace de connecteurs (ERP, RH, etc.)
- Certification ISO/ITIL pour crédibilité marché

#### 💡 Potentiel de Commercialisation

| Aspect | Stratégie |
|--------|----------|
| **Validation interne** | Prouver le concept dans l'entreprise d'origine |
| **Marché cible** | PME du BTP avec IT réduit (1-3 techniciens) |
| **Différenciateur** | Simplicité extrême + conçu PAR et POUR le BTP |
| **Modèle économique** | SaaS avec abonnement mensuel par utilisateur |
