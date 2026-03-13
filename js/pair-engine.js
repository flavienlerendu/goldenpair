/* ===== MBTI PAIR ENGINE ===== */
(function() {
  const KEY = window.PAIR_KEY;
  if (!KEY || !PAIRS[KEY] || !TYPES) {
    document.getElementById('app').innerHTML = '<div style="padding:2rem;text-align:center;color:red">Pair not found: ' + KEY + '</div>';
    return;
  }

  const parts = KEY.split('-');
  // Determine T1 and T2 from key
  // The key is always 4+4 chars joined by '-' e.g. infj-enfp or infj-infp
  // Could be multiple '-' so need to rejoin properly
  const allTypes = Object.keys(TYPES);
  let T1 = null, T2 = null;
  // Try all splits
  for (let i = 1; i < parts.length; i++) {
    const a = parts.slice(0, i).join('-').toUpperCase();
    const b = parts.slice(i).join('-').toUpperCase();
    if (TYPES[a] && TYPES[b]) { T1 = a; T2 = b; break; }
  }
  if (!T1 || !T2) {
    document.getElementById('app').innerHTML = '<div style="padding:2rem">Could not determine types from key: ' + KEY + '</div>';
    return;
  }

  const pair = PAIRS[KEY];
  const t1 = TYPES[T1];
  const t2 = TYPES[T2];
  const isSame = T1 === T2;

  // Inject color variables
  const styleEl = document.createElement('style');
  styleEl.textContent = `:root {
  --c1: ${t1.color};
  --c1b: ${t1.colorB};
  --c1g: ${t1.color}4d;
  --c1s: ${t1.color}1a;
  --c2: ${t2.color};
  --c2b: ${t2.colorB};
  --c2g: ${t2.color}4d;
  --c2s: ${t2.color}1a;
  --grad: linear-gradient(135deg, ${t1.color}, ${t2.color});
  --ip: ${t1.color};
  --ipb: ${t1.colorB};
  --ep: ${t2.color};
  --epb: ${t2.colorB};
}`;
  document.head.insertBefore(styleEl, document.head.firstChild);

  // Update page title and meta
  document.title = `${T1} × ${T2} — ${pair.badge} | MBTI Pairs`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', `Analyse de la compatibilité ${T1} × ${T2} : ${pair.subtitle}`);

  // ===== CONTENT LIBRARY =====
  const CONTENT = {
    strengths: {
      NN: [
        { ico: '🔮', t: 'Langage intuitif partagé', d: 'Deux intuitifs qui se comprennent sans avoir à tout expliquer — les métaphores, les connexions abstraites et les visions du futur ne nécessitent pas de traduction.' },
        { ico: '🌀', t: 'Conversations sans fond', d: 'Capables de s\'aventurer dans des territoires intellectuels que d\'autres trouvent inaccessibles, et d\'y rester des heures sans jamais s\'épuiser.' },
        { ico: '🧭', t: 'Vision à long terme commune', d: 'Tous deux pensent en trajectoires et en scénarios futurs plutôt qu\'en gestions du présent — une convergence rare et précieuse dans la planification de vie.' },
      ],
      SS: [
        { ico: '⚓', t: 'Ancrage dans le réel', d: 'Deux types concrets qui construisent leur relation sur des faits, des habitudes et des expériences vécues plutôt que sur des abstractions.' },
        { ico: '📋', t: 'Fiabilité mutuelle', d: 'Ce qui est dit est fait. Cette cohérence entre parole et action crée une confiance structurelle difficile à trouver dans d\'autres combinations.' },
        { ico: '🏡', t: 'Sens pratique partagé', d: 'La gestion quotidienne de la vie commune — finances, organisation, logistique — est naturellement fluide entre deux types sensoriels.' },
      ],
      NS: [
        { ico: '🌉', t: 'Complémentarité idée-réalité', d: 'L\'intuitif génère les visions et les possibilités ; le sensoriel les ancre dans le concret. Ensemble, ils couvrent l\'arc complet de la pensée à l\'action.' },
        { ico: '⚡', t: 'Stimulation par la différence', d: 'Ce que l\'un prend pour acquis fascine l\'autre. Cette différence de perception maintient une curiosité mutuelle durable.' },
        { ico: '🎯', t: 'Équilibre vision et méthode', d: 'L\'un voit loin, l\'autre sait construire. Cette division naturelle des rôles peut produire des résultats que ni l\'un ni l\'autre n\'atteindrait seul.' },
      ],
      FF: [
        { ico: '❤️', t: 'Profondeur émotionnelle partagée', d: 'Deux types orientés vers les valeurs et les connexions humaines qui se comprennent dans leur rapport à l\'authenticité et à l\'empathie.' },
        { ico: '🤝', t: 'Valeurs comme socle commun', d: 'Au-delà des désaccords superficiels, une boussole éthique similaire garantit une compréhension fondamentale sur ce qui compte vraiment.' },
        { ico: '🌱', t: 'Croissance émotionnelle mutuelle', d: 'Chacun encourage l\'autre à explorer et à exprimer sa vie intérieure avec une profondeur qu\'un partenaire T ne faciliterait pas autant.' },
      ],
      TF: [
        { ico: '⚖️', t: 'Équilibre logique et sensibilité', d: 'Le type T apporte la rigueur analytique ; le type F apporte la profondeur humaine. Ensemble, ils prennent de meilleures décisions que séparément.' },
        { ico: '🧠', t: 'Perspectives complémentaires', d: 'Là où l\'un voit un problème à résoudre, l\'autre voit une personne à comprendre. Cette dualité enrichit chaque situation vécue en commun.' },
        { ico: '🔥', t: 'Tension créatrice féconde', d: 'Leurs désaccords sur la méthode les obligent à articuler leurs raisonnements — ce qui renforce souvent la qualité de leurs décisions communes.' },
      ],
      TT: [
        { ico: '🎯', t: 'Franchise sans ambiguïté', d: 'Deux types directs qui préfèrent l\'honnêteté inconfortable à la diplomatie creuse. La communication est claire, sans sous-entendus ni manipulation.' },
        { ico: '🏆', t: 'Respect de la compétence', d: 'Ni l\'un ni l\'autre ne supporte la médiocrité. Quand chacun reconnaît la maîtrise de l\'autre, le respect est profond et sincère.' },
        { ico: '🧩', t: 'Indépendance mutuelle saine', d: 'Aucun des deux n\'est fusionnel. Ils respectent naturellement l\'espace intellectuel et émotionnel de l\'autre sans en faire une demande.' },
      ],
      EE: [
        { ico: '🎉', t: 'Énergie sociale amplifiée', d: 'Deux extravertis qui se rechargent mutuellement — leur présence combinée crée une dynamique sociale contagieuse et vivante.' },
        { ico: '💬', t: 'Communication naturellement fluide', d: 'Tous deux traitent l\'information à l\'oral et apprécient les échanges directs. La conversation ne demande aucun effort particulier.' },
        { ico: '🌍', t: 'Réseau relationnel commun', d: 'Deux extravertis construisent ensemble un tissu social riche qui enrichit leur vie de couple et leurs projets communs.' },
      ],
      II: [
        { ico: '🔒', t: 'Respect de l\'espace intérieur', d: 'Deux introvertis qui comprennent instinctivement le besoin de solitude de l\'autre sans jamais le vivre comme un rejet.' },
        { ico: '🌙', t: 'Profondeur dans la discrétion', d: 'Leur relation existe loin du bruit social — une intimité construite dans la qualité des échanges plutôt que leur fréquence ou leur visibilité.' },
        { ico: '⚓', t: 'Autonomie mutuelle valorisée', d: 'Chacun peut exister pleinement sans l\'autre sans que cela remette en question la solidité du lien. Une liberté rare et précieuse.' },
      ],
      EI: [
        { ico: '🌗', t: 'Complémentarité du rythme social', d: 'L\'extraverti aide l\'introverti à s\'ouvrir au monde ; l\'introverti aide l\'extraverti à trouver de la profondeur. Leurs besoins sociaux se complètent.' },
        { ico: '🎭', t: 'L\'un ancre, l\'autre explore', d: 'L\'introverti apporte la profondeur et la réflexion ; l\'extraverti apporte l\'enthousiasme et la connexion. Un équilibre naturellement stable.' },
        { ico: '🔋', t: 'Systèmes de recharge différents', d: 'L\'un se ressource dans l\'action sociale, l\'autre dans la solitude — ce qui leur permet de respecter leurs besoins sans conflit de rythme.' },
      ],
      JJ: [
        { ico: '📐', t: 'Organisation partagée', d: 'Deux types qui apprécient la structure, la planification et la clôture — leur vie commune est organisée de manière fluide et efficace.' },
        { ico: '🏗️', t: 'Projets communs bien construits', d: 'Ils planifient, ils exécutent, ils finissent. Cette capacité commune à aller jusqu\'au bout transforme leurs ambitions en réalités.' },
        { ico: '🎯', t: 'Objectifs partagés clarifiés', d: 'Tous deux préfèrent savoir où ils vont — ce qui facilite les décisions communes et réduit l\'ambiguïté sur l\'avenir de la relation.' },
      ],
      PP: [
        { ico: '🌊', t: 'Flexibilité mutuelle', d: 'Deux types qui s\'adaptent naturellement aux changements — aucun ne rigidifie une situation par excès de planification ou de contrôle.' },
        { ico: '🎨', t: 'Spontanéité comme mode de vie', d: 'Leur capacité commune à improviser crée une vie ensemble riche en découvertes inattendues et en expériences non planifiées.' },
        { ico: '🔓', t: 'Liberté dans l\'inachèvement', d: 'Tous deux sont à l\'aise avec l\'ambiguïté et l\'ouverture — ce qui réduit la pression de devoir clôturer chaque décision ou discussion.' },
      ],
      JP: [
        { ico: '⚖️', t: 'Complémentarité structure-flexibilité', d: 'Le type J apporte la direction et la clôture ; le type P apporte l\'adaptabilité et l\'ouverture aux possibilités. Ensemble, ils naviguent mieux les imprévus.' },
        { ico: '🏄', t: 'Équilibre plan et improvisation', d: 'L\'un planifie, l\'autre improvise — et si la communication est bonne, leurs projets communs bénéficient des deux dimensions.' },
        { ico: '🔄', t: 'Apprentissage mutuel des styles', d: 'Chacun élargit le registre de l\'autre : le J apprend à lâcher prise, le P apprend à s\'engager. Une croissance mutuelle profonde.' },
      ],
      NFNF: [
        { ico: '✨', t: 'Idéalisme comme langue native', d: 'Deux NF qui partagent la conviction que le monde peut et doit être meilleur — une vision qui donne sens à chaque aspect de leur relation.' },
        { ico: '🌺', t: 'Connexion humaine comme priorité absolue', d: 'Pour tous deux, la qualité des relations prime sur tout autre considération. Cet accord fondamental élimine de nombreux désaccords de fond.' },
      ],
      NTNT: [
        { ico: '🔬', t: 'Rigueur intellectuelle partagée', d: 'Deux NT qui exigent la même qualité de raisonnement l\'un de l\'autre — ce qui rend leurs échanges intellectuels particulièrement denses et stimulants.' },
        { ico: '🚀', t: 'Ambition systémique commune', d: 'Tous deux veulent comprendre et améliorer les systèmes — qu\'ils soient humains, technologiques ou conceptuels. Une vision du monde qui se rejoint.' },
      ],
      SJSJ: [
        { ico: '🏛️', t: 'Valeur de la tradition', d: 'Deux SJ qui comprennent l\'importance des traditions, des rituels et des précédents pour maintenir la cohésion et la sécurité du lien.' },
        { ico: '🔑', t: 'Fiabilité absolue', d: 'Ce que l\'un dit, l\'autre peut compter dessus. Cette cohérence fondamentale crée une sécurité relationnelle rare et profondément apaisante.' },
      ],
      SPSP: [
        { ico: '⚡', t: 'Vitalité dans l\'instant', d: 'Deux SP qui partagent le même rapport au temps présent — leur vie ensemble est riche d\'expériences immédiates, de découvertes et de vitalité.' },
        { ico: '🎸', t: 'Authenticité dans l\'action', d: 'Tous deux expriment qui ils sont par ce qu\'ils font plutôt que par ce qu\'ils disent. Une forme d\'honnêteté incarnée que chacun apprécie chez l\'autre.' },
      ],
      NFNT: [
        { ico: '💡', t: 'L\'intelligence au service de l\'humain', d: 'L\'NT apporte la rigueur analytique ; le NF apporte la profondeur humaine. Ensemble, ils créent des solutions qui sont à la fois brillantes et significatives.' },
        { ico: '🌐', t: 'Intuition comme terrain commun', d: 'Tous deux pensent en abstractions et en connexions invisibles — ce qui crée une compréhension mutuelle dans l\'espace de la pensée complexe.' },
      ],
      NFSJ: [
        { ico: '🌱', t: 'Soin dans des dimensions différentes', d: 'Le NF prend soin des âmes et des idéaux ; le SJ prend soin des personnes concrètes et des structures. Ensemble, ils couvrent toutes les dimensions du soin.' },
        { ico: '⚓', t: 'L\'idéal ancré dans le réel', d: 'Le NF inspire par ses visions ; le SJ construit les fondations qui permettent à ces visions de devenir durables. Une complémentarité fonctionnelle profonde.' },
      ],
      NFSP: [
        { ico: '🌸', t: 'Sensibilité partagée', d: 'NF et SP partagent une sensibilité aux dimensions humaines et sensorielles qui crée une connexion dans l\'espace de l\'expérience vécue.' },
        { ico: '🎨', t: 'Authenticité comme valeur commune', d: 'Tous deux rejettent les convenances vides et valorisent l\'expression authentique — ce qui facilite une honnêteté réelle dans la relation.' },
      ],
      NTSJ: [
        { ico: '🔧', t: 'Pragmatisme partagé', d: 'Deux types orientés vers l\'efficacité et les résultats concrets — leur collaboration dans les projets communs est naturellement productive.' },
        { ico: '🎯', t: 'Standards élevés', d: 'NT et SJ partagent une exigence de qualité — dans leur travail, dans leurs engagements et dans leur relation. Une aspiration commune à l\'excellence.' },
      ],
      NTSP: [
        { ico: '⚡', t: 'Action et analyse', d: 'Le NT analyse et planifie ; le SP agit et adapte. Cette division naturelle des rôles peut produire une efficacité remarquable dans les projets communs.' },
        { ico: '🔬', t: 'Fascination pour le fonctionnement des choses', d: 'Tous deux cherchent à comprendre comment les systèmes fonctionnent — l\'un dans l\'abstrait, l\'autre dans le concret. Un terrain de curiosité partagée.' },
      ],
      SJSP: [
        { ico: '🏗️', t: 'Pragmatisme du réel', d: 'Deux types sensoriels qui construisent leur relation sur des expériences concrètes et des actions tangibles plutôt que sur des abstractions ou des idéaux.' },
        { ico: '🔧', t: 'Compétences pratiques valorisées', d: 'Tous deux apprécient la maîtrise concrète, la compétence technique et l\'efficacité dans l\'action. Un respect mutuel fondé sur ce qui fonctionne vraiment.' },
      ],
      SAME: [
        { ico: '🪞', t: 'Compréhension sans traduction', d: 'Se voir en l\'autre avec une précision parfois troublante — leurs réactions, leurs besoins et leurs fonctionnements cognitifs s\'éclairent mutuellement.' },
        { ico: '🔐', t: 'Profondeur de la reconnaissance', d: 'Le sentiment d\'être vraiment compris, dans ses forces comme dans ses angles morts, par quelqu\'un qui les partage et peut les nommer.' },
        { ico: '⚡', t: 'Accélération de la croissance', d: 'Se voir dans l\'autre permet d\'identifier ses propres schémas avec une clarté inédite — ce qui peut accélérer le développement personnel de chacun.' },
      ],
    },
    challenges: {
      NN: [
        { ico: '☁️', t: 'Manque d\'ancrage concret', d: 'Deux intuitifs peuvent rester dans les abstractions indéfiniment. Sans effort conscient, les décisions pratiques, les finances et le quotidien sont négligés.' },
        { ico: '🌀', t: 'Plans qui restent des idées', d: 'Leur richesse de vision n\'est pas toujours accompagnée d\'une discipline d\'exécution. Les projets communs peuvent rester en suspens pendant des années.' },
        { ico: '🔮', t: 'Trop de possibilités, pas assez de choix', d: 'Deux intuitifs peuvent multiplier les options sans jamais converger vers une décision — une paralysie par l\'analyse des alternatives.' },
      ],
      SS: [
        { ico: '🔒', t: 'Résistance au changement', d: 'Deux types sensoriels peuvent s\'installer dans des routines confortables et résister aux évolutions nécessaires — relationnelles, professionnelles ou personnelles.' },
        { ico: '🌫️', t: 'Difficulté avec l\'abstrait', d: 'Les discussions sur des sujets conceptuels, les projections à long terme ou les questions existentielles peuvent créer un malaise partagé.' },
        { ico: '📦', t: 'Zone de confort commune', d: 'Leur confort partagé peut devenir un enfermement progressif si personne ne challenge l\'autre à explorer de nouvelles dimensions de vie.' },
      ],
      NS: [
        { ico: '🌁', t: 'Deux rythmes cognitifs', d: 'L\'intuitif pense en sauts qualitatifs ; le sensoriel pense en étapes concrètes. Cette différence de vitesse cognitive crée parfois une incompréhension profonde.' },
        { ico: '🗺️', t: 'Communication qui nécessite une traduction', d: 'L\'intuitif parle de "vibes" et de possibilités abstraites ; le sensoriel parle de faits et d\'actions concrètes. Chacun peut sembler incompréhensible à l\'autre.' },
        { ico: '⏰', t: 'Horizon temporel radicalement différent', d: 'L\'intuitif vit dans le futur et les possibilités ; le sensoriel préfère le présent concret et les précédents éprouvés. Une tension chronique sur les décisions importantes.' },
      ],
      FF: [
        { ico: '🌊', t: 'Surcharge émotionnelle mutuelle', d: 'Deux types F peuvent amplifier les émotions de l\'autre au point que des situations ordinaires deviennent des crises émotionnelles disproportionnées.' },
        { ico: '🔄', t: 'Évitement du conflit direct', d: 'Tous deux peuvent éviter les confrontations nécessaires par peur de blesser l\'autre — ce qui laisse des questions importantes irrésolues pendant des années.' },
        { ico: '⚡', t: 'Décisions sans ancrage logique', d: 'Sans un partenaire T pour challenger leurs décisions, deux F peuvent prendre des choix trop influencés par l\'état émotionnel du moment.' },
      ],
      TF: [
        { ico: '❄️', t: 'Fossé dans la communication émotionnelle', d: 'Le type T peut sembler froid et insensible au type F ; le type F peut sembler irrationnel et trop émotionnel au type T. Cette différence exige un travail de traduction constant.' },
        { ico: '🔪', t: 'La franchise comme blessure', d: 'Le type T dit ce qu\'il pense directement ; le type F l\'entend souvent comme une critique personnelle. Ce décalage d\'intention et de réception génère de nombreux malentendus.' },
        { ico: '⚖️', t: 'Critères de décision incompatibles', d: 'L\'un décide par la logique, l\'autre par les valeurs. Sur les grandes décisions de vie, cette différence peut créer des désaccords profonds et difficiles à réconcilier.' },
      ],
      TT: [
        { ico: '🏔️', t: 'Froideur émotionnelle partagée', d: 'Deux T peuvent rester en surface sur le plan émotionnel pendant des années, chacun attendant que l\'autre initie une conversation sur ce qu\'il ressent vraiment.' },
        { ico: '⚔️', t: 'Compétition intellectuelle', d: 'Avoir raison peut devenir plus important que comprendre l\'autre. Les débats entre deux T peuvent glisser vers une compétition d\'ego inconsciente.' },
        { ico: '💔', t: 'Vulnérabilité impossible à exprimer', d: 'Montrer une fragilité est difficile pour les deux. Sans effort délibéré, la relation peut rester intellectuellement riche mais émotionnellement distante.' },
      ],
      EE: [
        { ico: '🔊', t: 'Saturation sociale', d: 'Deux extravertis peuvent se retrouver constamment entourés de personnes, d\'activités et de stimulations — au détriment de la profondeur de leur connexion intime.' },
        { ico: '🗣️', t: 'Deux voix qui veulent s\'exprimer', d: 'Tous deux traitent l\'information à l\'oral — ce qui peut créer des conversations où les deux parlent en même temps sans vraiment s\'écouter.' },
        { ico: '🌪️', t: 'Absence de silence régénérateur', d: 'Sans temps calme et réflexif, leur relation peut manquer de la profondeur qui vient du silence partagé et de l\'intériorité.' },
      ],
      II: [
        { ico: '🧊', t: 'Initiative relationnelle bloquée', d: 'Deux introvertis peuvent attendre chacun que l\'autre exprime ses besoins ou initie la connexion — créant parfois un silence d\'incompréhension mutuelle.' },
        { ico: '🌫️', t: 'Isolation progressive', d: 'Sans un partenaire extraverti pour les pousser vers l\'extérieur, deux introvertis peuvent se retrancher progressivement dans leur bulle partagée.' },
        { ico: '🔒', t: 'Communication émotionnelle difficile', d: 'Deux introvertis peuvent trouver difficile d\'exprimer leurs besoins affectifs directement — chacun attendant des signaux que l\'autre n\'envoie pas forcément.' },
      ],
      EI: [
        { ico: '⚡', t: 'Rythme social incompatible', d: 'L\'extraverti veut plus de connexions et d\'activités sociales ; l\'introverti a besoin de solitude pour se ressourcer. Cette différence fondamentale nécessite une négociation permanente.' },
        { ico: '🔋', t: 'Systèmes de recharge opposés', d: 'Ce qui ressource l\'un épuise l\'autre. Sans une gestion explicite de leurs besoins respectifs, la relation peut devenir chroniquement déséquilibrée.' },
        { ico: '🗣️', t: 'Communication externe versus interne', d: 'L\'extraverti pense à voix haute et vite ; l\'introverti traite en silence et lentement. Cette différence de rythme crée des malentendus sur le niveau d\'engagement.' },
      ],
      JJ: [
        { ico: '🪨', t: 'Rigidité des plans', d: 'Deux J peuvent avoir du mal à adapter leurs plans quand la réalité l\'exige — créant une tension quand les circonstances changent et que personne ne veut lâcher.' },
        { ico: '⚔️', t: 'Deux autorités de décision', d: 'Deux J ont chacun une opinion forte sur la façon correcte de faire les choses — ce qui peut créer des conflits sur les petites décisions autant que les grandes.' },
        { ico: '🔒', t: 'Clôture prématurée', d: 'Tous deux peuvent clôturer des discussions ou des décisions avant que toutes les perspectives aient été entendues, par désir commun d\'avancer.' },
      ],
      PP: [
        { ico: '⏰', t: 'Procrastination partagée', d: 'Deux P peuvent éviter les décisions importantes en ouvrant toujours de nouvelles options — ce qui laisse des questions essentielles de la relation en suspens.' },
        { ico: '🌀', t: 'Absence de structure commune', d: 'Sans un partenaire J pour créer de la structure, deux P peuvent se retrouver dans un quotidien chaotique qui finit par épuiser même les plus flexibles.' },
        { ico: '🗓️', t: 'Difficulté à planifier l\'avenir', d: 'Les grandes décisions de vie — habitat, finances, projets à long terme — peuvent être perpétuellement reportées dans l\'attente d\'une meilleure information.' },
      ],
      JP: [
        { ico: '⏱️', t: 'Urgence versus exploration', d: 'Le type J veut décider et avancer ; le type P veut explorer et garder les options ouvertes. Cette différence fondamentale crée une tension chronique sur chaque décision.' },
        { ico: '📋', t: 'Structure vécue comme contrainte', d: 'Ce que le J voit comme organisation nécessaire, le P peut le vivre comme une rigidité étouffante. Ce décalage de perception génère des frictions dans le quotidien.' },
        { ico: '⚡', t: 'Rythme de clôture incompatible', d: 'L\'un est prêt à décider ; l\'autre a encore besoin d\'explorer. Sans une règle explicite sur les décisions partagées, cette tension peut paralyser des projets entiers.' },
      ],
      NFNF: [
        { ico: '🌊', t: 'Surcharge émotionnelle croisée', d: 'Deux NF en difficulté peuvent amplifier mutuellement leurs états émotionnels sans ancrage logique, créant des spirales d\'inquiétude ou d\'idéalisation.' },
        { ico: '☁️', t: 'Idéalisme sans réalisme', d: 'Deux idéalistes peuvent construire ensemble une vision du monde si éloignée du réel qu\'ils se retrouvent démunis face aux contraintes concrètes de la vie.' },
      ],
      NTNT: [
        { ico: '🔒', t: 'Vulnérabilité comme faiblesse', d: 'Deux NT peuvent rester indéfiniment dans l\'espace de l\'intellect sans jamais descendre dans l\'intimité émotionnelle — par peur mutuelle d\'y être jugés.' },
        { ico: '⚔️', t: 'Compétition de visions', d: 'Deux NT avec des visions différentes peuvent entrer dans une guerre de positions où l\'enjeu n\'est plus la vérité mais le statut intellectuel.' },
      ],
      SJSJ: [
        { ico: '📦', t: 'Résistance commune au changement', d: 'Deux SJ peuvent se renforcer mutuellement dans leur résistance aux évolutions nécessaires — créant une relation stable mais parfois étouffante.' },
        { ico: '🔒', t: 'Convention comme cage', d: 'L\'attachement partagé aux traditions et aux normes peut empêcher une remise en question salutaire des aspects de leur relation qui ne fonctionnent plus.' },
      ],
      SPSP: [
        { ico: '⏰', t: 'Avenir comme angle mort commun', d: 'Deux SP peuvent vivre pleinement dans le présent au détriment de la planification nécessaire pour construire un avenir commun solide.' },
        { ico: '🌀', t: 'Structure comme ennemie commune', d: 'Sans un partenaire J pour apporter de l\'organisation, deux SP peuvent voir leurs projets communs se disperser au gré des impulsions et des opportunités.' },
      ],
      NFNT: [
        { ico: '❄️', t: 'Fossé dans la gestion des émotions', d: 'Le NT peut sembler froid et insensible au NF ; le NF peut sembler illogique et trop réactif au NT. Ce fossé exige un effort conscient de traduction mutuelle.' },
        { ico: '⚡', t: 'Critères de vérité incompatibles', d: 'Pour le NT, une idée est vraie si elle est logiquement cohérente ; pour le NF, si elle résonne avec ses valeurs. Sur les grandes questions, cette différence peut créer un désaccord fondamental.' },
      ],
      NFSJ: [
        { ico: '🔄', t: 'Abstrait versus concret', d: 'Le NF vit dans les idéaux et les visions ; le SJ s\'ancre dans les méthodes éprouvées. Leur communication peut parfois se passer littéralement dans deux langues différentes.' },
        { ico: '⚡', t: 'Rythme de changement incompatible', d: 'Le NF cherche souvent à transcender les conventions ; le SJ les voit comme des garants de la stabilité. Cette tension peut créer des conflits récurrents sur les décisions de vie.' },
      ],
      NFSP: [
        { ico: '🔮', t: 'Futur versus présent', d: 'Le NF projette ses valeurs vers un idéal futur ; le SP vit pleinement dans l\'expérience présente. Cette différence temporelle peut créer une incompréhension sur les priorités.' },
        { ico: '💬', t: 'Expression émotionnelle différente', d: 'Le NF exprime les émotions par les mots et les idéaux ; le SP les exprime par les actes et les expériences partagées. Cette différence peut créer un vide de reconnaissance.' },
      ],
      NTSJ: [
        { ico: '🔬', t: 'Analyse versus tradition', d: 'Le NT remet tout en question, y compris les fondements ; le SJ s\'appuie sur ce qui a fait ses preuves. Cette différence peut créer des tensions récurrentes sur chaque décision.' },
        { ico: '⏰', t: 'Innovation versus stabilité', d: 'Le NT cherche à améliorer et à changer ; le SJ cherche à maintenir et à consolider. Cette tension peut paralyser les projets communs si elle n\'est pas consciemment gérée.' },
      ],
      NTSP: [
        { ico: '🌊', t: 'Profondeur versus action', d: 'Le NT veut comprendre avant d\'agir ; le SP veut agir pour comprendre. Ce décalage de méthode peut créer des frustrations dans les projets nécessitant les deux dimensions.' },
        { ico: '🔮', t: 'Horizon temporel différent', d: 'Le NT pense en systèmes à long terme ; le SP réagit à l\'environnement immédiat. Cette différence de temporalité peut créer des incompréhensions sur les priorités.' },
      ],
      SJSP: [
        { ico: '📋', t: 'Structure versus liberté', d: 'Le SJ cherche l\'ordre et la prévisibilité ; le SP cherche la flexibilité et la spontanéité. Cette différence fondamentale crée une tension chronique sur le rythme de vie quotidien.' },
        { ico: '🔒', t: 'Tradition versus adaptation', d: 'Le SJ s\'appuie sur les précédents ; le SP s\'adapte à chaque nouvelle situation. Cette différence de méthode peut créer des désaccords sur la façon de gérer les défis communs.' },
      ],
      SAME: [
        { ico: '🔄', t: 'Le miroir comme piège', d: 'Se voir en l\'autre peut révéler ses propres angles morts avec une intensité difficile à supporter — ce qui peut provoquer une projection ou une fuite de soi-même.' },
        { ico: '🌀', t: 'Angles morts partagés amplifiés', d: 'Deux personnes avec les mêmes faiblesses cognitives créent un vide commun qu\'aucun ne peut combler — sauf par un effort de développement personnel conscient.' },
        { ico: '⚡', t: 'Compétition pour le même rôle', d: 'Quand les deux partagent les mêmes forces, personne ne joue naturellement le rôle complémentaire — ce qui peut créer des conflits autour des responsabilités partagées.' },
      ],
    },
    commTips: {
      NN: [
        { ic: '🌀', t: 'Ancrez vos conversations dans le réel', d: 'Vos échanges peuvent rester abstraits indéfiniment. Imposez-vous une question pratique : <strong>«&nbsp;Qu\'est-ce que cela change concrètement ?&nbsp;»</strong> pour éviter la dérive conceptuelle.' },
        { ic: '⏰', t: 'Fixez des délais pour les décisions', d: 'Deux intuitifs peuvent explorer les alternatives à l\'infini. Accordez-vous un temps d\'exploration limité — puis <strong>décidez</strong>, même avec de l\'incertitude.' },
      ],
      SS: [
        { ic: '🌱', t: 'Cultivez la curiosité pour l\'abstrait', d: 'Vos conversations restent souvent dans le registre concret. Explorez occasionnellement des questions plus profondes pour enrichir votre connexion intellectuelle.' },
        { ic: '🔄', t: 'Challengez vos habitudes', d: 'Deux sensoriels peuvent s\'installer dans des routines. Introduisez délibérément de la nouveauté pour éviter que la stabilité ne devienne de la stagnation.' },
      ],
      NS: [
        { ic: '🌉', t: 'Traduisez mutuellement votre langage', d: 'L\'intuitif doit apprendre à <strong>conclure</strong> sa pensée avant de parler ; le sensoriel doit apprendre à <strong>accueillir</strong> les abstractions avant de chercher l\'application concrète.' },
        { ic: '⏸️', t: 'Ralentissez pour vous rejoindre', d: 'L\'intuitif saute ; le sensoriel marche. Marquez des pauses pour vérifier que vous parlez du même sujet avant de continuer dans des directions divergentes.' },
      ],
      FF: [
        { ic: '🧠', t: 'Apportez de la logique aux tensions', d: 'Quand les émotions s\'emballent, l\'un d\'eux doit prendre du recul et poser la question : <strong>«&nbsp;Qu\'est-ce qui est objectivement vrai ici ?&nbsp;»</strong> pour désescalader.' },
        { ic: '📋', t: 'Décidez avec des critères explicites', d: 'Sans une boussole logique partagée, deux F peuvent prendre des décisions uniquement selon l\'humeur du moment. Définissez vos critères avant la conversation.' },
      ],
      TF: [
        { ic: '💬', t: 'Dites ce dont vous avez besoin', d: 'Le F doit dire <strong>«&nbsp;j\'ai besoin d\'être entendu, pas de conseils&nbsp;»</strong>. Le T doit dire <strong>«&nbsp;je veux t\'aider, mais je ne sais pas comment&nbsp;»</strong>. Cette clarté évite la plupart des malentendus.' },
        { ic: '🌡️', t: 'Calibrez le registre de communication', d: 'Choisissez consciemment d\'être dans le mode <em>résolution de problème</em> ou le mode <em>connexion émotionnelle</em> — et assurez-vous d\'être dans le même.' },
      ],
      TT: [
        { ic: '❤️', t: 'Pratiquez la vulnérabilité délibérée', d: 'Accordez-vous le droit d\'exprimer une incertitude ou une peur sans que cela soit immédiatement analysé. La vulnérabilité n\'est pas une faiblesse — c\'est un acte de confiance.' },
        { ic: '🎙️', t: 'Distinguez débat et conversation', d: 'Pas chaque échange ne doit être gagné. Apprenez à signaler : <strong>«&nbsp;là, j\'ai besoin que tu m\'écoutes, pas que tu me répondes&nbsp;»</strong>.' },
      ],
      EE: [
        { ic: '🌙', t: 'Créez des moments d\'intimité silencieuse', d: 'Deux extravertis peuvent passer des semaines sans vraiment se regarder dans le calme. Réservez des moments où le silence est la communication principale.' },
        { ic: '🎧', t: 'Pratiquez l\'écoute sans interruption', d: 'Tous deux ont tendance à compléter les phrases ou à enchaîner. Pratiquez l\'écoute complète avant de répondre — même si c\'est inconfortable.' },
      ],
      II: [
        { ic: '🗣️', t: 'Initiez explicitement les conversations importantes', d: 'Deux introvertis peuvent attendre indéfiniment que l\'autre prenne l\'initiative. Accordez-vous le droit de commencer une conversation difficile <strong>sans attendre le moment parfait</strong>.' },
        { ic: '📬', t: 'Utilisez l\'écrit pour les sujets délicats', d: 'L\'écrit donne à chacun le temps de traiter avant de répondre — et réduit la pression du temps réel pour des profils qui préfèrent réfléchir avant de parler.' },
      ],
      EI: [
        { ic: '⏸️', t: 'L\'introverti a besoin de temps de traitement', d: 'Ce silence n\'est pas un désintérêt — c\'est le signe que la réponse sera plus aboutie. <strong>Ne remplissez pas ce silence</strong>. Attendez.' },
        { ic: '📢', t: 'L\'extraverti pense à voix haute', d: 'Ce qu\'il dit n\'est pas toujours sa position définitive — c\'est son processus de réflexion. Apprenez à distinguer <strong>exploration verbale et conclusion</strong>.' },
      ],
      JJ: [
        { ic: '🔓', t: 'Laissez des questions ouvertes', d: 'Deux J ferment naturellement les discussions rapidement. Pratiquez la règle : <strong>dormez dessus avant de décider</strong> pour les questions importantes.' },
        { ic: '⚖️', t: 'Négociez les domaines de décision', d: 'Définissez clairement qui a le dernier mot sur quoi. Cette structure explicite réduit les conflits d\'autorité récurrents entre deux décideurs naturels.' },
      ],
      PP: [
        { ic: '📅', t: 'Ritualisez les décisions importantes', d: 'Deux P peuvent éviter les décisions indéfiniment. Imposez-vous des revues périodiques avec des questions concrètes : <strong>«&nbsp;Où en est-on sur X ?&nbsp;»</strong>' },
        { ic: '🎯', t: 'Engagez-vous sur des minimums', d: 'Pas besoin de tout planifier — mais engagez-vous sur quelques points non négociables (budget, projets, dates). Cette ancre minimale évite la dérive.' },
      ],
      JP: [
        { ic: '⏳', t: 'Fixez ensemble un temps d\'exploration', d: 'Accordez-vous d\'explorer les options pendant une durée définie — puis le J ferme et le P s\'engage. Cette règle simple désamorce des heures de friction.' },
        { ic: '🔄', t: 'Nommez vos besoins du moment', d: 'Le J doit dire quand il a besoin de décider maintenant. Le P doit dire quand il a besoin d\'encore explorer. Rendre ces besoins explicites évite la guerre froide.' },
      ],
      SAME: [
        { ic: '🪞', t: 'Cherchez activement des perspectives extérieures', d: 'Deux personnes du même type ont les mêmes angles morts. Consultez régulièrement des personnes de types différents pour les décisions importantes.' },
        { ic: '⚡', t: 'Développez consciemment vos fonctions inférieures', d: 'Investissez séparément dans le développement de vos fonctions les plus faibles — puis partagez ces apprentissages pour combler vos lacunes communes.' },
      ],
      DEFAULT: [
        { ic: '💬', t: 'Règle d\'or de la communication', d: 'Dites explicitement ce dont vous avez besoin dans la conversation : être entendu, résoudre un problème, ou décider ensemble. Ne présumez pas que l\'autre le devine.' },
        { ic: '⚠️', t: 'Zone de danger à éviter', d: 'Quand la tension monte, identifiez si vous êtes en train de parler <em>du problème</em> ou de parler <em>de l\'autre</em>. Revenez toujours au problème concret.' },
      ],
    },
    tips: {
      NN: [
        { t: 'Planifiez le concret', d: 'Créez ensemble une routine de gestion des tâches pratiques (finances, logistique) que vos esprits intuitifs auraient naturellement tendance à ignorer.' },
        { t: 'Limitez les débats ouverts', d: 'Fixez un temps de réflexion maximal pour les décisions importantes. L\'exploration infinie est votre penchant naturel — la clôture est votre acte de discipline.' },
      ],
      SS: [
        { t: 'Introduisez de la nouveauté délibérément', d: 'Planifiez régulièrement des expériences nouvelles ensemble pour éviter que la stabilité partagée ne se transforme en stagnation progressive.' },
        { t: 'Explorez l\'abstrait par petites doses', d: 'Introduisez occasionnellement des sujets plus conceptuels ou philosophiques pour enrichir la dimension intellectuelle de votre relation.' },
      ],
      NS: [
        { t: 'Pratiquez la traduction mutuelle', d: 'L\'intuitif apprend à conclure sa pensée en termes concrets. Le sensoriel apprend à accueillir une idée abstraite avant d\'en chercher l\'application.' },
        { t: 'Valorisez les apports différents', d: 'Nommez régulièrement ce que l\'autre apporte que vous ne pourriez pas faire seul — cette reconnaissance explicite réduit les frustrations de style.' },
      ],
      FF: [
        { t: 'Intégrez un processus logique', d: 'Pour les décisions importantes, forcez-vous à lister les pour et les contre de manière systématique avant de laisser les émotions guider le choix final.' },
        { t: 'Autorisez les conflits nécessaires', d: 'Votre instinct d\'évitement du conflit peut laisser des problèmes réels s\'accumuler. Apprenez à tolérer un inconfort temporaire pour une résolution durable.' },
      ],
      TF: [
        { t: 'Apprenez la langue de l\'autre', d: 'Le T apprend à valider les émotions avant de proposer des solutions. Le F apprend à présenter ses besoins avec des arguments logiques concrets.' },
        { t: 'Définissez le mode de la conversation', d: 'Avant une conversation importante, signalez si vous cherchez du soutien émotionnel ou une aide à la résolution. Cette clarté évite la plupart des malentendus.' },
      ],
      TT: [
        { t: 'Ritualisez l\'expression émotionnelle', d: 'Créez un moment régulier (hebdomadaire) pour partager comment vous vous sentez dans la relation — sans chercher à résoudre ni à analyser.' },
        { t: 'Exprimez l\'admiration explicitement', d: 'Deux T expriment rarement leurs sentiments positifs. Cultivez l\'habitude de dire ce que vous appréciez chez l\'autre, même si cela vous semble évident.' },
      ],
      EE: [
        { t: 'Réservez des moments juste pour vous deux', d: 'Votre vie sociale peut être si riche qu\'elle prend toute la place. Protégez des soirées sans amis, sans activités, pour cultiver votre connexion intime.' },
        { t: 'Pratiquez l\'écoute active', d: 'Deux extravertis ont tendance à parler plus qu\'à écouter. Pratiquez délibérément l\'écoute complète — sans planifier votre réponse pendant que l\'autre parle.' },
      ],
      II: [
        { t: 'Combattez l\'isolement progressif', d: 'Deux introvertis peuvent se replier sur leur monde partagé. Maintenez des connexions sociales externes pour nourrir votre relation de perspectives nouvelles.' },
        { t: 'Initiez même si c\'est inconfortable', d: 'Chacun peut attendre l\'autre pour exprimer un besoin ou initier une connexion. Prenez l\'initiative de nommer vos besoins affectifs explicitement.' },
      ],
      EI: [
        { t: 'Négociez le rythme social ensemble', d: 'Établissez clairement combien de sorties sociales sont acceptables pour chacun dans la semaine. Cette règle explicite réduit les tensions chroniques.' },
        { t: 'Respectez le temps de recharge', d: 'L\'introverti a besoin de solitude — pas optionnellement mais fonctionnellement. Traitez ce besoin comme non négociable, pas comme un manque d\'intérêt.' },
      ],
      JJ: [
        { t: 'Négociez les domaines de décision', d: 'Définissez qui décide de quoi dans la relation. Cette structure explicite réduit les frictions autour du leadership et de l\'autorité.' },
        { t: 'Pratiquez la flexibilité ensemble', d: 'Introduisez délibérément des situations non planifiées pour développer votre tolérance commune à l\'incertitude et à l\'improvisation.' },
      ],
      PP: [
        { t: 'Créez une structure minimale non négociable', d: 'Engagez-vous sur quelques points fixes dans votre vie commune (rendez-vous hebdomadaire, budget mensuel) qui ne soient pas sujets à réinterprétation.' },
        { t: 'Fixez des délais pour les décisions importantes', d: 'Accordez-vous un temps d\'exploration limité sur les grandes décisions — puis décidez, même avec de l\'incertitude restante.' },
      ],
      JP: [
        { t: 'La règle du "délai d\'exploration"', d: 'Pour chaque décision importante, accordez-vous un temps d\'exploration défini ensemble — après lequel le J ferme et le P s\'engage. Simple mais efficace.' },
        { t: 'Valorisez explicitement vos différences', d: 'Le J apprend que le P apporte de la flexibilité précieuse. Le P apprend que le J apporte de la sécurité nécessaire. Nommez ces apports régulièrement.' },
      ],
      SAME: [
        { t: 'Cherchez des avis extérieurs', d: 'Consultez régulièrement des personnes de types différents pour les décisions importantes — vos angles morts communs sont réels et nécessitent des perspectives externes.' },
        { t: 'Développez vos fonctions inférieures', d: 'Investissez consciemment dans le développement des fonctions cognitives les plus faibles de votre type commun. C\'est un travail individuel qui bénéficie à la relation.' },
      ],
      DEFAULT: [
        { t: 'Communiquez vos besoins explicitement', d: 'Ne présumez jamais que l\'autre comprend ce dont vous avez besoin. Nommez-le clairement, sans attendre les signaux non verbaux.' },
        { t: 'Construisez des rituels de connexion', d: 'Identifiez deux ou trois moments réguliers dans la semaine dédiés à votre connexion intime — sans distraction, sans agenda, juste vous deux.' },
      ],
    },
  };

  // ===== SELECT CONTENT =====
  function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; }
    return Math.abs(h);
  }

  function pick(arr, seed) {
    return arr[hashStr(KEY + seed) % arr.length];
  }

  function getCategory() {
    if (isSame) return 'SAME';
    const t1N = t1.traits.N, t2N = t2.traits.N;
    const t1E = t1.traits.E, t2E = t2.traits.E;
    const t1T = t1.traits.T, t2T = t2.traits.T;
    const t1J = t1.traits.J, t2J = t2.traits.J;
    const temp = t1.temperament + t2.temperament;
    const tempKey = t1.temperament === t2.temperament ? t1.temperament + t1.temperament : [t1.temperament, t2.temperament].sort().join('');

    return {
      NS: t1N === t2N ? (t1N ? 'NN' : 'SS') : 'NS',
      TF: t1T === t2T ? (t1T ? 'TT' : 'FF') : 'TF',
      EI: t1E === t2E ? (t1E ? 'EE' : 'II') : 'EI',
      JP: t1J === t2J ? (t1J ? 'JJ' : 'PP') : 'JP',
      temp: tempKey,
    };
  }

  const cats = isSame ? { NS: 'SAME', TF: 'SAME', EI: 'SAME', JP: 'SAME', temp: 'SAME' } : getCategory();

  function getStrengths() {
    const items = [];
    const C = CONTENT.strengths;
    const add = (cat, seed) => {
      const pool = C[cat] || C.NN;
      items.push(pick(pool, seed));
    };
    add(cats.NS, 's1');
    add(cats.NS, 's2');
    add(cats.TF, 's3');
    add(cats.TF, 's4');
    add(cats.EI, 's5');
    add(cats.EI, 's6');
    if (isSame) {
      add('SAME', 's7'); add('SAME', 's8');
    } else {
      add(cats.temp in C ? cats.temp : cats.JP, 's7');
      add(cats.JP, 's8');
    }
    return items;
  }

  function getChallenges() {
    const items = [];
    const C = CONTENT.challenges;
    const add = (cat, seed) => {
      const pool = C[cat] || C.NS;
      items.push(pick(pool, seed));
    };
    add(cats.NS, 'c1');
    add(cats.NS, 'c2');
    add(cats.TF, 'c3');
    add(cats.TF, 'c4');
    add(cats.EI, 'c5');
    add(cats.EI, 'c6');
    if (isSame) {
      add('SAME', 'c7'); add('SAME', 'c8');
    } else {
      add(cats.temp in C ? cats.temp : cats.JP, 'c7');
      add(cats.JP, 'c8');
    }
    return items;
  }

  function getCommTips() {
    const C = CONTENT.commTips;
    const tips = [];
    const nsKey = isSame ? 'SAME' : cats.NS;
    const tfKey = isSame ? 'SAME' : cats.TF;
    const eiKey = isSame ? 'SAME' : cats.EI;
    const jpKey = isSame ? 'SAME' : cats.JP;

    // 2 type-specific
    tips.push(pick(C[eiKey] || C.DEFAULT, 'ct1'));
    tips.push(pick(C[tfKey] || C.DEFAULT, 'ct2'));
    // sweet spot
    tips.push({ ic: '🏆', t: 'Terrain gagnant', d: pick(C[nsKey] || C.DEFAULT, 'ct3').d });
    // danger zone
    tips.push({ ic: '⚠️', t: 'Zone de danger', d: pick(C[jpKey] || C.DEFAULT, 'ct4').d });
    // golden rule
    tips.push(C.DEFAULT[1]);
    return tips;
  }

  function getPracticalTips() {
    const C = CONTENT.tips;
    const tips = [];
    const add = (cat, seed) => {
      const pool = C[cat] || C.DEFAULT;
      tips.push(pick(pool, seed));
    };
    if (isSame) {
      for (let i = 0; i < 8; i++) add('SAME', 'pt' + i);
    } else {
      add(cats.NS, 'pt0'); add(cats.NS, 'pt1');
      add(cats.TF, 'pt2'); add(cats.TF, 'pt3');
      add(cats.EI, 'pt4'); add(cats.EI, 'pt5');
      add(cats.JP, 'pt6'); add(cats.JP, 'pt7');
    }
    return tips;
  }

  function getDuoRoles() {
    const r1 = t1.roles;
    const r2 = t2.roles;
    const duos = [
      { r1: r1[0], r2: r2[0], d: `${r1[0]} et ${r2[0]} — deux façons de comprendre le monde qui, en dialogue, couvrent ce qu\'aucun ne verrait seul.` },
      { r1: r1[1], r2: r2[1], d: `${r1[1]} rencontre ${r2[1]} — une complémentarité qui se révèle dans les moments de défi commun.` },
      { r1: r1[0], r2: r2[1], d: `La rencontre de ${r1[0].toLowerCase()} et de ${r2[1].toLowerCase()} crée une dynamique que ni l\'un ni l\'autre ne génère seul.` },
      { r1: r1[1], r2: r2[0], d: `${r1[1]} et ${r2[0]} — deux forces qui s\'articulent dans l\'action commune pour un impact plus grand que la somme des parties.` },
    ];
    return duos;
  }

  // ===== KPI COLORS =====
  const KPI_COLORS = [
    '#c084fc', '#e879a8', '#a78bfa', '#f59e0b',
    '#f97316', '#d97706', '#8b5cf6', '#6366f1',
    '#ec4899', '#a855f7'
  ];

  // ===== BUILD HTML =====
  const strengths = getStrengths();
  const challenges = getChallenges();
  const commTips = getCommTips();
  const practTips = getPracticalTips();
  const duoRoles = getDuoRoles();

  const KPI_LABELS = [
    'Compatibilité globale', 'Connexion émotionnelle', 'Lien intellectuel',
    'Communication', 'Résolution de conflits', 'Vie quotidienne',
    'Alignement des valeurs', 'Confiance', 'Intimité', 'Potentiel long terme'
  ];

  function strItems(arr, cls) {
    return arr.map(s => `
      <div class="sc-item ${cls}">
        <div class="sc-ico">${s.ico}</div>
        <div>
          <div class="sc-t">${s.t}</div>
          <div class="sc-d">${s.d}</div>
        </div>
      </div>`).join('');
  }

  function funcRows(type, cls) {
    return TYPES[type].functions.map(f => `
      <div class="func-row">
        <div class="fc ${cls}">${f.code}</div>
        <div>
          <div class="frole">${f.role}</div>
          <div class="fname">${f.name}</div>
          <div class="fdesc">${f.desc}</div>
        </div>
      </div>`).join('');
  }

  function stressItems(type, cls) {
    const td = TYPES[type];
    const energ = td.energizers.map(e => `<li><span class="sdot"></span>${e}</li>`).join('');
    const stress = td.stressors.map(e => `<li><span class="sdot"></span>${e}</li>`).join('');
    return `
      <div class="stress-card ${cls} r">
        <div class="sh-row">
          <span class="sbadge ${cls === 'sc-i' ? 'i' : 'e'}">${type}</span>
          <span class="snick">${td.stressNick}</span>
        </div>
        <div class="ssub ok">✦ Ce qui l'énergise</div>
        <ul class="slist ok-l" role="list">${energ}</ul>
        <div class="ssub err">◆ Ce qui le stresse</div>
        <ul class="slist err-l" role="list">${stress}</ul>
      </div>`;
  }

  function loveRows(type, cls) {
    const td = TYPES[type];
    return td.loveLangs.map((l, i) => `
      <div class="love-row ${i === 1 ? 'sh-' + (cls === 'i' ? 'c1' : 'c2') : ''}">
        <span class="ln">${i + 1}</span>
        <span class="le">${l.emoji}</span>
        <span>${l.label}</span>
      </div>`).join('');
  }

  // Determine which type goes left (c1/i) and which goes right (c2/e)
  // By convention, T1 = left (c1), T2 = right (c2)
  const tipCards = practTips.map((tip, i) => `
    <div class="tip-card r ${i % 3 === 1 ? 'd1' : i % 3 === 2 ? 'd2' : ''}">
      <div class="tip-n">0${i + 1}</div>
      <div class="tip-t">${tip.t}</div>
      <div class="tip-d">${tip.d}</div>
    </div>`).join('');

  const duoCards = duoRoles.map((duo, i) => `
    <div class="duo-card r ${i % 3 === 1 ? 'd1' : i % 3 === 2 ? 'd2' : i % 3 === 0 && i > 0 ? 'd3' : ''}">
      <div class="duo-pair">
        <div class="dr i">${duo.r1}</div>
        <div class="duo-plus">+</div>
        <div class="dr e">${duo.r2}</div>
      </div>
      <div class="duo-d">${duo.d}</div>
    </div>`).join('');

  const navPairs = getNavPairs();

  function getNavPairs() {
    // Find a few related pairs for footer nav
    const allKeys = Object.keys(PAIRS);
    const related = allKeys.filter(k => k !== KEY && (k.includes(T1.toLowerCase()) || k.includes(T2.toLowerCase()))).slice(0, 3);
    return related.map(k => {
      const p = k.split('-');
      let a = '', b = '';
      for (let i = 1; i < p.length; i++) {
        const x = p.slice(0, i).join('-').toUpperCase();
        const y = p.slice(i).join('-').toUpperCase();
        if (TYPES[x] && TYPES[y]) { a = x; b = y; break; }
      }
      return `<a href="${k}.html">${a} × ${b}</a>`;
    }).join('');
  }

  // Mirror section title
  const mirrorTitle = isSame
    ? `Le reflet exact`
    : t1.traits.N === t2.traits.N
      ? 'Fonctions cognitives : l\'axe commun'
      : 'Fonctions cognitives : deux mondes différents';

  const mirrorDesc = isSame
    ? `Les mêmes fonctions cognitives, la même hiérarchie — une reconnaissance absolue qui révèle autant qu\'elle unit.`
    : `Comprendre les fonctions de chacun permet de décoder les incompréhensions et de valoriser les complémentarités.`;

  const html = `
<nav>
  <div class="nav-left">
    <a href="./index.html" class="nav-back">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
      Tous les pairs
    </a>
    <div class="nav-logo">${T1} × ${T2}</div>
  </div>
  <button class="theme-btn" id="tb" aria-label="Changer le thème">
    <svg id="tic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  </button>
</nav>

<section class="hero">
  <canvas id="starCanvas"></canvas>
  <div class="orb-layer">
    <div class="orb orb-i"></div>
    <div class="orb orb-e"></div>
    <div class="orb orb-m"></div>
  </div>
  <div class="hero-content">
    <div class="hero-badge">✦ ${pair.badge} ✦</div>
    <h1 class="hero-title">
      <span class="ti">${T1}</span><span class="tx-sep"> × </span><span class="te">${T2}</span>
    </h1>
    <p class="hero-sub">${pair.subtitle}</p>
    <p class="hero-desc">${pair.desc}</p>
    <div class="hero-stats">
      <div class="hstat"><div class="hstat-n" data-t="${pair.kpi[0]}">0</div><div class="hstat-l">% Compatibilité</div></div>
      <div class="hstat"><div class="hstat-n" data-t="${isSame ? 4 : Math.round(pair.kpi[2] / 25)}">0</div><div class="hstat-l">${isSame ? 'Fonctions communes' : 'Axes cognitifs communs'}</div></div>
      <div class="hstat"><div class="hstat-n" data-t="8">0</div><div class="hstat-l">Clés de succès</div></div>
    </div>
  </div>
  <div class="scroll-hint">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
    Défiler
  </div>
</section>

<section id="compat">
  <div class="wrap">
    <div class="sh r">
      <span class="stag">Compatibilité</span>
      <h2 class="stitle">Vue d'ensemble</h2>
      <div class="ssep"></div>
      <p class="sdesc">Dix dimensions clés analysées à partir de la psychologie des types cognitifs et des dynamiques relationnelles.</p>
    </div>
    <div class="kpi-grid" id="kpiGrid"></div>
  </div>
</section>

<section id="mirror">
  <div class="wrap">
    <div class="sh r">
      <span class="stag">Fonctions cognitives</span>
      <h2 class="stitle">${mirrorTitle}</h2>
      <div class="ssep"></div>
      <p class="sdesc">${mirrorDesc}</p>
    </div>
    <div class="mirror-box r">
      <div class="mirror-grid">
        <div class="mcol">
          <div class="mcol-title mi">${T1}</div>
          ${funcRows(T1, 'fi')}
        </div>
        <div class="mcol-c">
          <span>⇄</span><span>⇄</span><span>⇄</span><span>⇄</span>
        </div>
        <div class="mcol">
          <div class="mcol-title me">${T2}</div>
          ${funcRows(T2, 'fe')}
        </div>
      </div>
    </div>
  </div>
</section>

<section id="sc">
  <div class="wrap">
    <div class="sh r">
      <span class="stag">Analyse</span>
      <h2 class="stitle">Forces & Défis</h2>
      <div class="ssep"></div>
      <p class="sdesc">Ce qui rend cette combinaison puissante — et ce qui demande un travail conscient.</p>
    </div>
    <div class="sc-wrap">
      <div class="r">
        <div class="sc-col-title"><span class="ic-wrap ic-ok">✦</span> Forces</div>
        ${strItems(strengths, 'str')}
      </div>
      <div class="r d2">
        <div class="sc-col-title"><span class="ic-wrap ic-err">◆</span> Défis</div>
        ${strItems(challenges, 'chl')}
      </div>
    </div>
  </div>
</section>

<section id="comm">
  <div class="wrap">
    <div class="sh r">
      <span class="stag">Communication</span>
      <h2 class="stitle">Dynamiques de communication</h2>
      <div class="ssep"></div>
      <p class="sdesc">Comprendre comment chacun traite et exprime l'information pour mieux se rejoindre.</p>
    </div>
    <div class="comm-grid">
      <div class="comm-card r">
        <h3>Profils comparés</h3>
        <div class="radar-wrap"><canvas id="radarChart"></canvas></div>
      </div>
      <div class="r d2">
        <h3 style="font-family:var(--fd);font-size:1.05rem;font-weight:600;margin-bottom:1.25rem;">Conseils communication</h3>
        <div class="ctips">
          ${commTips.map(tip => `
          <div class="ctip">
            <div class="ctip-ic">${tip.ic}</div>
            <div class="ctip-txt"><strong>${tip.t} :</strong> ${tip.d}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<section id="stress">
  <div class="wrap">
    <div class="sh r">
      <span class="stag">Bien-être</span>
      <h2 class="stitle">Stress & Besoins</h2>
      <div class="ssep"></div>
      <p class="sdesc">Comprendre comment chacun réagit sous pression pour mieux se soutenir dans les moments difficiles.</p>
    </div>
    <div class="stress-grid">
      ${stressItems(T1, 'sc-i')}
      ${stressItems(T2, 'sc-e')}
    </div>
  </div>
</section>

<section id="love">
  <div class="wrap">
    <div class="sh r">
      <span class="stag">Amour</span>
      <h2 class="stitle">Langages de l'amour</h2>
      <div class="ssep"></div>
      <p class="sdesc">Comprendre comment chacun donne et reçoit l'amour est une clé essentielle pour nourrir la connexion intime.</p>
    </div>
    <div class="love-wrap r">
      <div>
        <div class="love-col-t i">${T1}</div>
        ${loveRows(T1, 'i')}
      </div>
      <div class="love-center">
        <div class="love-orb">💞</div>
        <div class="love-lbl">Terrain commun de connexion et d'amour partagé</div>
      </div>
      <div>
        <div class="love-col-t e">${T2}</div>
        ${loveRows(T2, 'e')}
      </div>
    </div>
  </div>
</section>

<section id="tips">
  <div class="wrap">
    <div class="sh r">
      <span class="stag">Guide pratique</span>
      <h2 class="stitle">8 clés pour réussir</h2>
      <div class="ssep"></div>
      <p class="sdesc">Des leviers concrets pour transformer les défis de cette relation en opportunités de croissance mutuelle.</p>
    </div>
    <div class="tips-grid">
      ${tipCards}
    </div>
  </div>
</section>

<section id="duo">
  <div class="wrap">
    <div class="sh r">
      <span class="stag">Complémentarité</span>
      <h2 class="stitle">Le duo dynamique</h2>
      <div class="ssep"></div>
      <p class="sdesc">Quand leurs forces s'articulent plutôt que se confrontent, ${T1} et ${T2} créent quelque chose de plus grand que la somme de leurs parties.</p>
    </div>
    <div class="duo-grid">
      ${duoCards}
    </div>
  </div>
</section>

<footer>
  <div class="footer-inner">
    <div class="footer-brand">${T1} × ${T2} — ${pair.badge}</div>
    <nav class="footer-nav" aria-label="Navigation">
      <a href="./index.html">← Tous les pairs</a>
      ${navPairs}
    </nav>
    <div class="footer-src">
      Sources : Crystal Knows, Psychology Junkie, Cognitive Type, Personnalité & Relations — Données croisées sur la compatibilité des types MBTI
    </div>
  </div>
</footer>`;

  document.getElementById('app').innerHTML = html;

  // ===== INITIALIZE JS =====

  /* THEME */
  const root = document.documentElement;
  let theme = 'dark';
  const sunSVG = `<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>`;
  const moonSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
  document.getElementById('tb').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    document.getElementById('tic').innerHTML = theme === 'dark' ? sunSVG : moonSVG;
    if (radarInst) setTimeout(buildRadar, 50);
  });

  /* SCROLL PROGRESS */
  window.addEventListener('scroll', () => {
    const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('sp').style.width = p + '%';
  }, { passive: true });

  /* STARFIELD */
  (function() {
    const cv = document.getElementById('starCanvas');
    const ctx = cv.getContext('2d');
    let stars = [], frame = 0, running = true;
    function resize() { cv.width = window.innerWidth; cv.height = window.innerHeight; build(); }
    function build() {
      stars = [];
      const n = Math.floor(cv.width * cv.height / 7500);
      for (let i = 0; i < n; i++) {
        const isColored = Math.random() < 0.15;
        stars.push({
          x: Math.random() * cv.width, y: Math.random() * cv.height,
          r: Math.random() * 1.4 + 0.2, o: Math.random() * 0.65 + 0.15,
          sp: Math.random() * 0.25 + 0.04, ph: Math.random() * Math.PI * 2,
          col: isColored ? (Math.random() < 0.5 ? t1.color : t2.color) : null,
        });
      }
    }
    function draw() {
      if (!running) { requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, cv.width, cv.height);
      frame++;
      for (const s of stars) {
        const op = s.o * (0.55 + 0.45 * Math.sin(frame * s.sp * 0.04 + s.ph));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.col ? s.col + Math.round(op * 255).toString(16).padStart(2, '0') : `rgba(255,255,255,${op})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    const heroEl = document.querySelector('.hero');
    const viz = new IntersectionObserver(e => { running = e[0].isIntersecting; }, { threshold: 0.01 });
    viz.observe(heroEl);
    window.addEventListener('resize', resize);
    resize();
    draw();
  })();

  /* REVEAL */
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.r').forEach(el => ro.observe(el));

  /* ANIMATE NUMBER */
  function animNum(el, target, dur = 1400) {
    const start = performance.now();
    (function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * ease);
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  /* HERO COUNTERS */
  const ho = new IntersectionObserver(e => {
    if (e[0].isIntersecting) {
      document.querySelectorAll('.hstat-n').forEach(el => animNum(el, +el.dataset.t));
      ho.disconnect();
    }
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) ho.observe(heroStats);

  /* KPI GRID */
  const kpiData = pair.kpi.map((v, i) => ({ label: KPI_LABELS[i], value: v, color: KPI_COLORS[i] }));
  const grid = document.getElementById('kpiGrid');
  kpiData.forEach((k, i) => {
    const d = i % 3 === 1 ? ' d1' : i % 3 === 2 ? ' d2' : '';
    const card = document.createElement('div');
    card.className = 'kpi-card r' + d;
    card.innerHTML = `
      <div class="g-wrap">
        <canvas id="g${i}"></canvas>
        <div class="g-val"><span class="gn" data-t="${k.value}">0</span><sup>%</sup></div>
      </div>
      <div class="kpi-lbl">${k.label}</div>`;
    grid.appendChild(card);
    ro.observe(card);
  });

  /* GAUGE DRAW */
  function drawGauge(canvas, val, color) {
    const sz = 108;
    canvas.width = sz * 2; canvas.height = sz * 2;
    canvas.style.width = sz + 'px'; canvas.style.height = sz + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    const cx = sz / 2, r = cx - 11;
    const sa = -Math.PI * .75, ea = Math.PI * .75, total = ea - sa;
    const target = val / 100;
    let prog = 0;
    const bgColor = getComputedStyle(root).getPropertyValue('--bdr').trim() || '#252048';
    (function frame() {
      ctx.clearRect(0, 0, sz, sz);
      ctx.beginPath(); ctx.arc(cx, cx, r, sa, ea);
      ctx.strokeStyle = bgColor; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.stroke();
      if (prog > 0) {
        ctx.beginPath(); ctx.arc(cx, cx, r, sa, sa + total * prog);
        ctx.strokeStyle = color; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cx, r, sa, sa + total * prog);
        ctx.strokeStyle = color + '38'; ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.stroke();
      }
      if (prog < target) { prog = Math.min(prog + .018, target); requestAnimationFrame(frame); }
    })();
  }

  const go = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const cv = e.target.querySelector('canvas');
        const idx = +cv.id.slice(1);
        drawGauge(cv, kpiData[idx].value, kpiData[idx].color);
        animNum(e.target.querySelector('.gn'), kpiData[idx].value, 1200);
        go.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.kpi-card').forEach(c => go.observe(c));

  /* RADAR CHART */
  let radarInst = null;
  function buildRadar() {
    const cv = document.getElementById('radarChart');
    if (!cv) return;
    const st = getComputedStyle(root);
    const c1 = t1.color;
    const c2 = t2.color;
    const txm = st.getPropertyValue('--txm').trim();
    const bdr = st.getPropertyValue('--bdr').trim();
    if (radarInst) radarInst.destroy();
    radarInst = new Chart(cv, {
      type: 'radar',
      data: {
        labels: ['Rapidité', 'Profondeur', 'Expressivité', 'Temps de traitement', 'Écoute active', 'Spontanéité'],
        datasets: [
          { label: T1, data: t1.radar, borderColor: c1, backgroundColor: c1 + '22', borderWidth: 2, pointBackgroundColor: c1, pointRadius: 4 },
          { label: T2, data: t2.radar, borderColor: c2, backgroundColor: c2 + '22', borderWidth: 2, pointBackgroundColor: c2, pointRadius: 4 },
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true, max: 100,
            ticks: { display: false, stepSize: 25 },
            grid: { color: bdr }, angleLines: { color: bdr },
            pointLabels: { color: txm, font: { family: "'Satoshi', sans-serif", size: 11, weight: '500' } }
          }
        },
        plugins: {
          legend: { position: 'bottom', labels: { color: txm, font: { family: "'Satoshi', sans-serif", size: 12 }, padding: 16, usePointStyle: true, pointStyle: 'circle' } },
          tooltip: { backgroundColor: 'rgba(8,6,22,.92)', titleFont: { family: "'Satoshi', sans-serif" }, bodyFont: { family: "'Satoshi', sans-serif" }, padding: 12, cornerRadius: 8 }
        },
        animation: { duration: 900, easing: 'easeOutQuart' }
      }
    });
  }

  const radarObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { buildRadar(); radarObs.unobserve(e.target); } });
  }, { threshold: 0.3 });
  const radarEl = document.getElementById('radarChart');
  if (radarEl) radarObs.observe(radarEl);

})();
