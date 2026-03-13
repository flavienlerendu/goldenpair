/* ===== MBTI TYPES DATA ===== */
const TYPES = {
  INTJ: {
    color: '#1d4ed8',
    colorB: '#93c5fd',
    nickname: "L'Architecte",
    stressNick: "L'Architecte stratège",
    roles: ['Architecte', 'Visionnaire'],
    functions: [
      { code: 'Ni', role: 'Dominante', name: 'Intuition introvertie', desc: 'Vision convergente : identifie la trajectoire la plus probable et s\'y engage avec conviction absolue' },
      { code: 'Te', role: 'Auxiliaire', name: 'Pensée extravertie', desc: 'Efficacité systémique, décision rapide, structures mesurables et résultats concrets' },
      { code: 'Fi', role: 'Tertiaire', name: 'Sentiment introverti', desc: 'Boussole éthique personnelle, valeurs profondes rarement exprimées mais jamais négociables' },
      { code: 'Se', role: 'Inférieure', name: 'Sensation extravertie', desc: 'Rapport au présent sensoriel difficile sous pression — point de vulnérabilité et d\'hédonisme impulsif' },
    ],
    energizers: [
      'Projets complexes avec vision à long terme',
      'Autonomie totale dans la conception et l\'exécution',
      'Systèmes élégants et bien conçus',
      'Maîtrise progressive d\'un domaine de précision',
      'Solitude productive et concentration profonde'
    ],
    stressors: [
      'Chaos et inefficacité systémique répétée',
      'Interruptions de la concentration profonde',
      'Devoir gérer les émotions des autres',
      'Plans constamment remis en question sans raison valable',
      'Hédonisme impulsif sous stress extrême (Se inférieure)'
    ],
    loveLangs: [
      { emoji: '🛠️', label: 'Actes de service' },
      { emoji: '⏳', label: 'Moments de qualité' },
      { emoji: '💬', label: 'Paroles valorisantes' },
    ],
    radar: [32, 96, 38, 90, 72, 18],
    temperament: 'NT',
    traits: { E: false, N: true, T: true, J: true },
  },
  INTP: {
    color: '#4338ca',
    colorB: '#a5b4fc',
    nickname: 'Le Logicien',
    stressNick: 'Le Logicien analyste',
    roles: ['Analyste', 'Théoricien'],
    functions: [
      { code: 'Ti', role: 'Dominante', name: 'Pensée introvertie', desc: 'Logique interne autonome, déconstruction des systèmes pour en saisir les principes fondamentaux' },
      { code: 'Ne', role: 'Auxiliaire', name: 'Intuition extravertie', desc: 'Génération de connexions entre concepts distants, exploration des ramifications inattendues' },
      { code: 'Si', role: 'Tertiaire', name: 'Sensation introvertie', desc: 'Mémoire des précédents, référence aux expériences passées pour calibrer les nouvelles informations' },
      { code: 'Fe', role: 'Inférieure', name: 'Sentiment extraverti', desc: 'Sensibilité au groupe émergente sous stress — besoin d\'appartenance difficile à exprimer' },
    ],
    energizers: [
      'Problèmes théoriques sans solution évidente',
      'Liberté totale d\'exploration intellectuelle',
      'Systèmes complexes à modéliser',
      'Débats d\'idées sans agenda émotionnel',
      'Solitude et temps pour la réflexion approfondie'
    ],
    stressors: [
      'Obligation de prendre des décisions sans données suffisantes',
      'Environnements sociaux intenses et contraignants',
      'Travail répétitif sans défi intellectuel',
      'Critique de leur intelligence ou de leur logique',
      'Besoin soudain de connexion émotionnelle (Fe inférieure)'
    ],
    loveLangs: [
      { emoji: '⏳', label: 'Moments de qualité' },
      { emoji: '💬', label: 'Paroles valorisantes' },
      { emoji: '🎁', label: 'Cadeaux symboliques' },
    ],
    radar: [45, 94, 32, 88, 58, 35],
    temperament: 'NT',
    traits: { E: false, N: true, T: true, J: false },
  },
  ENTJ: {
    color: '#0284c7',
    colorB: '#7dd3fc',
    nickname: 'Le Commandant',
    stressNick: 'Le Commandant déterminé',
    roles: ['Commandant', 'Stratège'],
    functions: [
      { code: 'Te', role: 'Dominante', name: 'Pensée extravertie', desc: 'Maîtrise de l\'environnement par des systèmes efficaces, leadership décisif et orientation vers les résultats' },
      { code: 'Ni', role: 'Auxiliaire', name: 'Intuition introvertie', desc: 'Vision à long terme précise, identification des schémas sous-jacents et des trajectoires futures' },
      { code: 'Se', role: 'Tertiaire', name: 'Sensation extravertie', desc: 'Présence physique forte, appétit pour l\'action immédiate et les expériences sensorielles intenses' },
      { code: 'Fi', role: 'Inférieure', name: 'Sentiment introverti', desc: 'Vulnérabilité émotionnelle profonde rarement exprimée, valeurs personnelles intenses sous stress' },
    ],
    energizers: [
      'Leadership de projets ambitieux à fort impact',
      'Défis stratégiques complexes exigeant des décisions rapides',
      'Équipes compétentes à mobiliser vers un objectif commun',
      'Confrontation à des problèmes systémiques à résoudre',
      'Reconnaissance de la compétence et de l\'efficacité'
    ],
    stressors: [
      'Incompétence ou inefficacité persistante dans l\'entourage',
      'Perte de contrôle sur les résultats d\'un projet',
      'Obligation de traiter des émotions sans solution pratique',
      'Environnements chaotiques sans structure ni direction',
      'Remise en question de leur autorité ou de leur vision'
    ],
    loveLangs: [
      { emoji: '⏳', label: 'Moments de qualité' },
      { emoji: '💬', label: 'Paroles valorisantes' },
      { emoji: '🛠️', label: 'Actes de service' },
    ],
    radar: [85, 88, 72, 82, 58, 65],
    temperament: 'NT',
    traits: { E: true, N: true, T: true, J: true },
  },
  ENTP: {
    color: '#0891b2',
    colorB: '#67e8f9',
    nickname: 'Le Débatteur',
    stressNick: 'Le Débatteur iconoclaste',
    roles: ['Débatteur', 'Explorateur'],
    functions: [
      { code: 'Ne', role: 'Dominante', name: 'Intuition extravertie', desc: 'Vision divergente : génère des connexions inattendues et explore toutes les ramifications possibles' },
      { code: 'Ti', role: 'Auxiliaire', name: 'Pensée introvertie', desc: 'Logique interne autonome, analyse des systèmes pour en saisir les principes fondateurs' },
      { code: 'Fe', role: 'Tertiaire', name: 'Sentiment extraverti', desc: 'Sensibilité au groupe, humour social, empathie performative parfois maladroite sous pression' },
      { code: 'Si', role: 'Inférieure', name: 'Sensation introvertie', desc: 'Mémoire des précédents et des routines — tend à s\'activer sous stress comme inquiétude rétrospective' },
    ],
    energizers: [
      'Débats d\'idées sans tabou ni conclusion imposée',
      'Défis intellectuels complexes et nouveaux domaines',
      'Liberté de changer de cap selon les découvertes',
      'Interlocuteurs capables de tenir tête intellectuellement',
      'Connexions inattendues entre domaines distincts'
    ],
    stressors: [
      'Structure rigide et micromanagement contraignant',
      'Sentiment d\'être enfermé dans une routine immuable',
      'Incompétence perçue chez les décideurs',
      'Obligation de finir ce qui est devenu intellectuellement stérile',
      'Inquiétude obsessionnelle rétroactive (Si inférieure sous stress)'
    ],
    loveLangs: [
      { emoji: '💬', label: 'Paroles valorisantes' },
      { emoji: '⏳', label: 'Moments de qualité' },
      { emoji: '🛠️', label: 'Actes de service' },
    ],
    radar: [90, 70, 82, 28, 52, 92],
    temperament: 'NT',
    traits: { E: true, N: true, T: false, J: false },
  },
  INFJ: {
    color: '#6d28d9',
    colorB: '#c4b5fd',
    nickname: 'L\'Avocat',
    stressNick: 'Le Visionnaire empathique',
    roles: ['Conseiller', 'Visionnaire'],
    functions: [
      { code: 'Ni', role: 'Dominante', name: 'Intuition introvertie', desc: 'Reconnaissance de schémas profonds, vision du futur, insights qui surgissent comme des révélations' },
      { code: 'Fe', role: 'Auxiliaire', name: 'Sentiment extraverti', desc: 'Empathie profonde, recherche d\'harmonie, lecture fine des émotions et des dynamiques de groupe' },
      { code: 'Ti', role: 'Tertiaire', name: 'Pensée introvertie', desc: 'Analyse logique intérieure, quête de cohérence interne et de vérité systémique' },
      { code: 'Se', role: 'Inférieure', name: 'Sensation extravertie', desc: 'Conscience sensorielle du moment présent — point faible qui provoque une sensibilité accrue au chaos' },
    ],
    energizers: [
      'Connexions profondes et authentiques avec des esprits similaires',
      'Travail orienté vers un sens et un impact humain réel',
      'Solitude pour recharger et traiter les impressions accumulées',
      'Exploration des idées abstraites avec une dimension humaniste',
      'Sentiment d\'avoir contribué à quelque chose de plus grand que soi'
    ],
    stressors: [
      'Conflits interpersonnels sans résolution possible',
      'Devoir trahir ses valeurs profondes pour des convenances sociales',
      'Excès de stimulation sensorielle et sociale sans échappatoire',
      'Sentiment que ses insights sont ignorés ou méprisés',
      'Indulgences sensorielles excessives sous stress (Se inférieure)'
    ],
    loveLangs: [
      { emoji: '💬', label: 'Paroles valorisantes' },
      { emoji: '⏳', label: 'Moments de qualité' },
      { emoji: '🤗', label: 'Toucher physique' },
    ],
    radar: [35, 95, 55, 90, 90, 35],
    temperament: 'NF',
    traits: { E: false, N: true, T: false, J: true },
  },
  INFP: {
    color: '#a21caf',
    colorB: '#f0abfc',
    nickname: 'Le Médiateur',
    stressNick: 'Le Médiateur idéaliste',
    roles: ['Idéaliste', 'Poète'],
    functions: [
      { code: 'Fi', role: 'Dominante', name: 'Sentiment introverti', desc: 'Boussole intérieure absolue, valeurs personnelles intenses et authenticité comme impératif existentiel' },
      { code: 'Ne', role: 'Auxiliaire', name: 'Intuition extravertie', desc: 'Exploration des possibilités, connexions symboliques, génération de sens à partir des expériences' },
      { code: 'Si', role: 'Tertiaire', name: 'Sensation introvertie', desc: 'Mémoire émotionnelle riche, attachement aux expériences significatives du passé' },
      { code: 'Te', role: 'Inférieure', name: 'Pensée extravertie', desc: 'Organisation et exécution difficiles sous pression — peut devenir critique excessive sous stress' },
    ],
    energizers: [
      'Expression créative sans contrainte ni jugement',
      'Connexions authentiques basées sur des valeurs partagées',
      'Solitude pour explorer l\'univers intérieur',
      'Causes humanitaires avec un impact concret',
      'Liberté de définir son propre chemin et son identité'
    ],
    stressors: [
      'Devoir agir contre ses valeurs fondamentales',
      'Critiques perçues comme des attaques contre l\'identité',
      'Environnements froids, compétitifs et sans empathie',
      'Trop de demandes pratiques qui étouffent la vie intérieure',
      'Comportement rigide et critique sous stress (Te inférieure)'
    ],
    loveLangs: [
      { emoji: '⏳', label: 'Moments de qualité' },
      { emoji: '💬', label: 'Paroles valorisantes' },
      { emoji: '🤗', label: 'Toucher physique' },
    ],
    radar: [42, 88, 62, 85, 82, 55],
    temperament: 'NF',
    traits: { E: false, N: true, T: false, J: false },
  },
  ENFJ: {
    color: '#7e22ce',
    colorB: '#d8b4fe',
    nickname: 'Le Protagoniste',
    stressNick: 'Le Mentor charismatique',
    roles: ['Mentor', 'Catalyseur'],
    functions: [
      { code: 'Fe', role: 'Dominante', name: 'Sentiment extraverti', desc: 'Orientation naturelle vers l\'harmonie collective, lecture empathique des besoins émotionnels de groupe' },
      { code: 'Ni', role: 'Auxiliaire', name: 'Intuition introvertie', desc: 'Vision à long terme sur le développement des personnes et les trajectoires relationnelles' },
      { code: 'Se', role: 'Tertiaire', name: 'Sensation extravertie', desc: 'Présence charismatique, sensibilité à l\'atmosphère, capacité à lire le langage non-verbal' },
      { code: 'Ti', role: 'Inférieure', name: 'Pensée introvertie', desc: 'Analyse critique intérieure — peut devenir autocritique excessive sous pression' },
    ],
    energizers: [
      'Accompagner des personnes vers leur plein potentiel',
      'Créer de l\'harmonie et de la cohésion dans un groupe',
      'Visions collectives inspirantes à long terme',
      'Reconnaissance de l\'impact positif sur les autres',
      'Connexions profondes basées sur la confiance mutuelle'
    ],
    stressors: [
      'Conflits interpersonnels irrésolus dans l\'entourage',
      'Sentiment de ne pas être à la hauteur de ses idéaux',
      'Devoir décevoir les personnes qui comptent sur eux',
      'Absence de reconnaissance malgré les efforts investis',
      'Autocritique paralysante sous stress (Ti inférieure)'
    ],
    loveLangs: [
      { emoji: '💬', label: 'Paroles valorisantes' },
      { emoji: '⏳', label: 'Moments de qualité' },
      { emoji: '🤗', label: 'Toucher physique' },
    ],
    radar: [78, 92, 88, 85, 78, 72],
    temperament: 'NF',
    traits: { E: true, N: true, T: false, J: true },
  },
  ENFP: {
    color: '#b45309',
    colorB: '#fcd34d',
    nickname: 'Le Protagoniste créatif',
    stressNick: 'Le Campaigner enthousiaste',
    roles: ['Inspirateur', 'Avocat du diable'],
    functions: [
      { code: 'Ne', role: 'Dominante', name: 'Intuition extravertie', desc: 'Génération enthousiaste d\'idées et de possibilités, vision des connexions entre tout et tout' },
      { code: 'Fi', role: 'Auxiliaire', name: 'Sentiment introverti', desc: 'Valeurs personnelles profondes, authenticité absolue, boussole morale intérieure non négociable' },
      { code: 'Te', role: 'Tertiaire', name: 'Pensée extravertie', desc: 'Organisation et passage à l\'action — disponible mais pas toujours confortable' },
      { code: 'Si', role: 'Inférieure', name: 'Sensation introvertie', desc: 'Mémoire, routines et traditions — point faible qui provoque des difficultés avec le quotidien structuré' },
    ],
    energizers: [
      'Explorer de nouvelles idées et possibilités sans limite',
      'Connexions authentiques et conversations significatives',
      'Liberté de suivre sa curiosité et son intuition',
      'Projets créatifs avec un impact humain réel',
      'Découvrir des patterns cachés dans l\'expérience humaine'
    ],
    stressors: [
      'Routines rigides qui étouffent la spontanéité',
      'Sentiment de ne pas être authentiquement soi',
      'Isolement ou absence de connexions significatives',
      'Devoir sacrifier ses valeurs pour des règles arbitraires',
      'Obsession avec les détails répétitifs sous stress (Si inférieure)'
    ],
    loveLangs: [
      { emoji: '💬', label: 'Paroles valorisantes' },
      { emoji: '⏳', label: 'Moments de qualité' },
      { emoji: '🤗', label: 'Toucher physique' },
    ],
    radar: [90, 65, 95, 30, 60, 95],
    temperament: 'NF',
    traits: { E: true, N: true, T: false, J: false },
  },
  ISTJ: {
    color: '#374151',
    colorB: '#9ca3af',
    nickname: 'L\'Inspecteur',
    stressNick: 'Le Gardien de l\'ordre',
    roles: ['Gardien', 'Pilier'],
    functions: [
      { code: 'Si', role: 'Dominante', name: 'Sensation introvertie', desc: 'Mémoire factuelle précise, référence aux précédents éprouvés, fiabilité fondée sur l\'expérience accumulée' },
      { code: 'Te', role: 'Auxiliaire', name: 'Pensée extravertie', desc: 'Organisation systématique, respect des procédures efficaces, orientation vers les résultats mesurables' },
      { code: 'Fi', role: 'Tertiaire', name: 'Sentiment introverti', desc: 'Valeurs morales solides et discrètes, loyauté profonde envers les personnes qui ont fait leurs preuves' },
      { code: 'Ne', role: 'Inférieure', name: 'Intuition extravertie', desc: 'Anxiété face aux scénarios catastrophes improbables sous stress — imagination négative excessive' },
    ],
    energizers: [
      'Travail précis avec des résultats tangibles et mesurables',
      'Systèmes organisés qui fonctionnent sans friction',
      'Responsabilité claire et rôles bien définis',
      'Sentiment d\'accomplir un devoir important',
      'Stabilité et prévisibilité dans l\'environnement'
    ],
    stressors: [
      'Désorganisation et chaos imprévisible',
      'Changements de cap fréquents sans justification',
      'Devoir improviser sans préparation adéquate',
      'Manque de respect pour les procédures établies',
      'Catastrophisme et anxiété sous stress (Ne inférieure)'
    ],
    loveLangs: [
      { emoji: '🛠️', label: 'Actes de service' },
      { emoji: '⏳', label: 'Moments de qualité' },
      { emoji: '🎁', label: 'Cadeaux symboliques' },
    ],
    radar: [55, 75, 28, 65, 80, 22],
    temperament: 'SJ',
    traits: { E: false, N: false, T: true, J: true },
  },
  ISFJ: {
    color: '#166534',
    colorB: '#86efac',
    nickname: 'Le Défenseur',
    stressNick: 'Le Défenseur protecteur',
    roles: ['Protecteur', 'Nourricier'],
    functions: [
      { code: 'Si', role: 'Dominante', name: 'Sensation introvertie', desc: 'Mémoire affective détaillée, attachement aux traditions porteuses de sens et de continuité' },
      { code: 'Fe', role: 'Auxiliaire', name: 'Sentiment extraverti', desc: 'Orientation naturelle vers le bien-être des autres, empathie pratique et soutien concret' },
      { code: 'Ti', role: 'Tertiaire', name: 'Pensée introvertie', desc: 'Analyse logique discrète pour évaluer l\'efficacité des soins prodigués et des structures en place' },
      { code: 'Ne', role: 'Inférieure', name: 'Intuition extravertie', desc: 'Imagination anxieuse des scénarios négatifs possibles sous stress prolongé' },
    ],
    energizers: [
      'Aider concrètement des personnes dans le besoin',
      'Maintenir l\'harmonie et la stabilité dans les relations proches',
      'Traditions significatives qui renforcent les liens familiaux',
      'Environnement ordonné et prévisible',
      'Reconnaissance sincère du soin apporté aux autres'
    ],
    stressors: [
      'Conflits interpersonnels qui menacent l\'harmonie',
      'Sentiment de ne pas être apprécié malgré les sacrifices',
      'Devoir affronter un conflit directement',
      'Changements brusques sans transition douce',
      'Anxiété excessive et catastrophisme sous stress (Ne inférieure)'
    ],
    loveLangs: [
      { emoji: '🛠️', label: 'Actes de service' },
      { emoji: '🤗', label: 'Toucher physique' },
      { emoji: '💬', label: 'Paroles valorisantes' },
    ],
    radar: [48, 72, 55, 70, 92, 30],
    temperament: 'SJ',
    traits: { E: false, N: false, T: false, J: true },
  },
  ESTJ: {
    color: '#92400e',
    colorB: '#fcd34d',
    nickname: 'Le Directeur',
    stressNick: 'Le Directeur exécutif',
    roles: ['Directeur', 'Organisateur'],
    functions: [
      { code: 'Te', role: 'Dominante', name: 'Pensée extravertie', desc: 'Leadership directif, application rigoureuse des systèmes éprouvés, orientation absolue vers l\'efficacité' },
      { code: 'Si', role: 'Auxiliaire', name: 'Sensation introvertie', desc: 'Référence aux précédents fiables, respect des procédures qui ont fait leurs preuves' },
      { code: 'Ne', role: 'Tertiaire', name: 'Intuition extravertie', desc: 'Capacité à envisager des alternatives pratiques quand les méthodes habituelles échouent' },
      { code: 'Fi', role: 'Inférieure', name: 'Sentiment introverti', desc: 'Valeurs personnelles profondes rarement exprimées — peut émerger comme intransigeance morale sous stress' },
    ],
    energizers: [
      'Diriger des équipes vers des objectifs clairs et mesurables',
      'Systèmes organisationnels bien huilés et fiables',
      'Responsabilité concrète avec autorité reconnue',
      'Traditions et institutions qui maintiennent l\'ordre social',
      'Accomplissement de tâches avec des standards élevés'
    ],
    stressors: [
      'Incompétence et manque de rigueur chez les collaborateurs',
      'Remise en question de l\'autorité sans justification valable',
      'Chaos organisationnel et absence de procédures',
      'Devoir gérer des émotions plutôt que des faits',
      'Rigidité excessive et dogmatisme sous stress (Fi inférieure)'
    ],
    loveLangs: [
      { emoji: '🛠️', label: 'Actes de service' },
      { emoji: '💬', label: 'Paroles valorisantes' },
      { emoji: '⏳', label: 'Moments de qualité' },
    ],
    radar: [72, 60, 42, 68, 55, 35],
    temperament: 'SJ',
    traits: { E: true, N: false, T: true, J: true },
  },
  ESFJ: {
    color: '#065f46',
    colorB: '#6ee7b7',
    nickname: 'Le Consul',
    stressNick: 'Le Consul attentionné',
    roles: ['Hôte', 'Rassembleur'],
    functions: [
      { code: 'Fe', role: 'Dominante', name: 'Sentiment extraverti', desc: 'Orientation vers l\'harmonie collective, sensibilité aux besoins du groupe, hospitalité naturelle' },
      { code: 'Si', role: 'Auxiliaire', name: 'Sensation introvertie', desc: 'Mémoire affective des détails personnels, attachement aux traditions qui tissent le lien social' },
      { code: 'Ne', role: 'Tertiaire', name: 'Intuition extravertie', desc: 'Créativité pratique au service du bien-être collectif, réponses aux besoins émergents' },
      { code: 'Ti', role: 'Inférieure', name: 'Pensée introvertie', desc: 'Logique interne — peut devenir autocritique ou critique des incohérences sous pression' },
    ],
    energizers: [
      'Créer des espaces de chaleur et d\'appartenance',
      'Aider concrètement les personnes de l\'entourage proche',
      'Célébrations et traditions qui renforcent les liens',
      'Reconnaissance sincère et exprimée du soin apporté',
      'Environnement social harmonieux et prévisible'
    ],
    stressors: [
      'Rejet ou désapprobation de personnes importantes',
      'Conflits prolongés sans résolution dans le cercle proche',
      'Sentiment d\'être exploité sans réciprocité',
      'Devoir critiquer des personnes qu\'ils aiment',
      'Cynisme excessif ou analyse froide sous stress (Ti inférieure)'
    ],
    loveLangs: [
      { emoji: '💬', label: 'Paroles valorisantes' },
      { emoji: '🤗', label: 'Toucher physique' },
      { emoji: '🛠️', label: 'Actes de service' },
    ],
    radar: [62, 78, 72, 75, 70, 55],
    temperament: 'SJ',
    traits: { E: true, N: false, T: false, J: true },
  },
  ISTP: {
    color: '#0c4a6e',
    colorB: '#7dd3fc',
    nickname: 'Le Virtuose',
    stressNick: 'Le Virtuose pragmatique',
    roles: ['Virtuose', 'Technicien'],
    functions: [
      { code: 'Ti', role: 'Dominante', name: 'Pensée introvertie', desc: 'Analyse mécanique précise, compréhension des systèmes par l\'expérimentation directe et le démontage' },
      { code: 'Se', role: 'Auxiliaire', name: 'Sensation extravertie', desc: 'Présence totale dans l\'action physique, réponse immédiate à l\'environnement sensoriel' },
      { code: 'Ni', role: 'Tertiaire', name: 'Intuition introvertie', desc: 'Insights soudains sur les trajectoires cachées des systèmes et des situations' },
      { code: 'Fe', role: 'Inférieure', name: 'Sentiment extraverti', desc: 'Besoin de connexion sociale émergent sous stress — peut se manifester comme brusquerie ou sensibilité excessive' },
    ],
    energizers: [
      'Maîtrise technique d\'outils ou de systèmes complexes',
      'Action directe dans l\'environnement physique',
      'Liberté totale dans l\'exploration par essai-erreur',
      'Résolution de problèmes concrets sous pression',
      'Indépendance et autonomie dans l\'organisation du travail'
    ],
    stressors: [
      'Obligations sociales prolongées sans issue',
      'Discussions abstraites sans application concrète',
      'Manque d\'espace personnel et d\'autonomie',
      'Déséquilibre émotionnel des personnes de l\'entourage',
      'Besoin soudain de validation sociale sous stress (Fe inférieure)'
    ],
    loveLangs: [
      { emoji: '⏳', label: 'Moments de qualité' },
      { emoji: '🛠️', label: 'Actes de service' },
      { emoji: '🤗', label: 'Toucher physique' },
    ],
    radar: [78, 70, 30, 45, 52, 75],
    temperament: 'SP',
    traits: { E: false, N: false, T: true, J: false },
  },
  ISFP: {
    color: '#9f1239',
    colorB: '#fda4af',
    nickname: 'L\'Aventurier',
    stressNick: 'L\'Artiste introspectif',
    roles: ['Artiste', 'Explorateur'],
    functions: [
      { code: 'Fi', role: 'Dominante', name: 'Sentiment introverti', desc: 'Sensibilité esthétique et émotionnelle intense, authenticité absolue comme impératif de vie' },
      { code: 'Se', role: 'Auxiliaire', name: 'Sensation extravertie', desc: 'Immersion dans le monde sensoriel, présence au moment présent, expression artistique par les sens' },
      { code: 'Ni', role: 'Tertiaire', name: 'Intuition introvertie', desc: 'Insights soudains sur les significations cachées, vision symbolique des expériences vécues' },
      { code: 'Te', role: 'Inférieure', name: 'Pensée extravertie', desc: 'Organisation et structure difficiles sous pression — peut devenir critique acerbe sous stress' },
    ],
    energizers: [
      'Expression créative authentique et libre',
      'Expériences sensorielles riches et beautés du monde',
      'Connexions intimes basées sur la confiance profonde',
      'Liberté de suivre ses valeurs sans contrainte',
      'Présence dans la nature et les espaces de beauté'
    ],
    stressors: [
      'Critiques de l\'expression personnelle ou de l\'identité',
      'Environnements froids, compétitifs et impersonnels',
      'Obligation de respecter des structures rigides',
      'Devoir prendre des décisions dans l\'urgence',
      'Rigidité et critique acerbe sous stress (Te inférieure)'
    ],
    loveLangs: [
      { emoji: '🤗', label: 'Toucher physique' },
      { emoji: '⏳', label: 'Moments de qualité' },
      { emoji: '🛠️', label: 'Actes de service' },
    ],
    radar: [65, 80, 58, 55, 68, 82],
    temperament: 'SP',
    traits: { E: false, N: false, T: false, J: false },
  },
  ESTP: {
    color: '#991b1b',
    colorB: '#fca5a5',
    nickname: 'L\'Entrepreneur',
    stressNick: 'L\'Entrepreneur audacieux',
    roles: ['Négociateur', 'Exécutant'],
    functions: [
      { code: 'Se', role: 'Dominante', name: 'Sensation extravertie', desc: 'Présence totale dans l\'action, lecture immédiate de l\'environnement, réponse adaptative instantanée' },
      { code: 'Ti', role: 'Auxiliaire', name: 'Pensée introvertie', desc: 'Analyse mécanique rapide, logique pragmatique au service de l\'efficacité dans l\'action' },
      { code: 'Fe', role: 'Tertiaire', name: 'Sentiment extraverti', desc: 'Charme naturel, lecture des dynamiques sociales, capacité à mobiliser les gens dans l\'instant' },
      { code: 'Ni', role: 'Inférieure', name: 'Intuition introvertie', desc: 'Anxiété existentielle et rumination sur le sens sous stress prolongé' },
    ],
    energizers: [
      'Action dans des situations de haute intensité',
      'Négociation et persuasion en temps réel',
      'Défis physiques et compétitions directes',
      'Résolution de crises concrètes avec des enjeux réels',
      'Liberté de mouvement et variété des expériences'
    ],
    stressors: [
      'Obligations abstraites sans résultats tangibles immédiats',
      'Environnements théoriques et conceptuels sans application',
      'Contraintes rigides qui limitent la liberté d\'action',
      'Attentes à long terme sans jalons clairs à court terme',
      'Anxiété existentielle et rumination sous stress (Ni inférieure)'
    ],
    loveLangs: [
      { emoji: '🤗', label: 'Toucher physique' },
      { emoji: '⏳', label: 'Moments de qualité' },
      { emoji: '🛠️', label: 'Actes de service' },
    ],
    radar: [95, 48, 68, 25, 45, 98],
    temperament: 'SP',
    traits: { E: true, N: false, T: true, J: false },
  },
  ESFP: {
    color: '#9a3412',
    colorB: '#fdba74',
    nickname: 'Le Showman',
    stressNick: 'L\'Animateur spontané',
    roles: ['Animateur', 'Rassembleur'],
    functions: [
      { code: 'Se', role: 'Dominante', name: 'Sensation extravertie', desc: 'Immersion joyeuse dans le moment présent, présence vivante, enthousiasme contagieux' },
      { code: 'Fi', role: 'Auxiliaire', name: 'Sentiment introverti', desc: 'Valeurs personnelles solides sous l\'exubérance, authenticité émotionnelle dans les connexions proches' },
      { code: 'Te', role: 'Tertiaire', name: 'Pensée extravertie', desc: 'Pragmatisme pratique, capacité à mobiliser des ressources pour les plaisirs et les projets' },
      { code: 'Ni', role: 'Inférieure', name: 'Intuition introvertie', desc: 'Sens existentiel difficile à articuler — peut émerger comme pessimisme soudain sous stress' },
    ],
    energizers: [
      'Célébrations, fêtes et expériences partagées vivantes',
      'Connexions spontanées et nouvelles rencontres',
      'Aventures et découvertes sans planification excessive',
      'Expression artistique dans l\'instant présent',
      'Sentiment de rendre les autres heureux par sa présence'
    ],
    stressors: [
      'Routine ennuyeuse et absence de stimulation sensorielle',
      'Isolement social prolongé',
      'Obligations futures abstraites sans satisfaction immédiate',
      'Conflits persistants qui altèrent l\'harmonie',
      'Pessimisme existentiel soudain sous stress (Ni inférieure)'
    ],
    loveLangs: [
      { emoji: '🤗', label: 'Toucher physique' },
      { emoji: '💬', label: 'Paroles valorisantes' },
      { emoji: '⏳', label: 'Moments de qualité' },
    ],
    radar: [92, 62, 85, 22, 55, 98],
    temperament: 'SP',
    traits: { E: true, N: false, T: false, J: false },
  },
};
