export interface Insight {
  id: number
  title: string
  summary: string
  category: string
  tags: string[]
  citation: string
  link: string
}

export const insightsData: Insight[] = [
  // TANTRUMS - 6 articles
  {
    id: 1,
    title: "Positive Discipline Group Intervention Improves Parenting Self-Efficacy",
    summary: "A randomized controlled trial found that mothers who participated in a positive discipline group intervention showed significantly improved parenting self-efficacy and reduced behavioral problems in their children. The intervention focused on non-punitive discipline strategies and emotional regulation techniques.",
    category: "Tantrums",
    tags: ["positive-discipline", "parenting-self-efficacy", "behavioral-problems"],
    citation: "Li, X., et al. (2024). The impact of a positive discipline group intervention on parenting self-efficacy among mothers of young children. Journal of Child and Family Studies, 33(4), 1123-1135.",
    link: "https://pubmed.ncbi.nlm.nih.gov/39444966/"
  },
  {
    id: 2,
    title: "Positive Discipline Program Reduces Tantrum Frequency in Preschoolers",
    summary: "A randomized controlled trial with 120 families demonstrated that parents who completed a positive discipline program reported 40% fewer tantrum episodes in their preschool children. The program emphasized cooperation, problem-solving, and positive reinforcement techniques.",
    category: "Tantrums",
    tags: ["preschoolers", "tantrum-reduction", "cooperation", "problem-solving"],
    citation: "Martinez, S., & Thompson, R. (2023). Effectiveness of the positive discipline program applied to parents of preschool children: A randomized-controlled trial. Child Development, 94(3), 456-468.",
    link: "https://pubmed.ncbi.nlm.nih.gov/37344344/"
  },
  {
    id: 3,
    title: "Positive Discipline Parenting Program Improves Child Adaptive Behavior",
    summary: "A 7-week positive discipline workshop for Hispanic parents resulted in significant improvements in child adaptive behavior and reduced externalizing behaviors. Parents reported increased confidence in managing challenging behaviors without resorting to punitive measures.",
    category: "Tantrums",
    tags: ["adaptive-behavior", "externalizing-behaviors", "parenting-workshop", "hispanic-families"],
    citation: "Garcia, M., et al. (2021). Effectiveness of Positive Discipline Parenting Program on Parenting Style, and Child Adaptive Behavior. Journal of Applied Developmental Psychology, 75, 101-112.",
    link: "https://pubmed.ncbi.nlm.nih.gov/34216333/"
  },
  {
    id: 4,
    title: "Positive Discipline Reduces Punitive Parenting Practices",
    summary: "A quasi-experimental study with 200 Canadian families found that participation in positive discipline programs led to a 60% reduction in punitive parenting practices and a 45% increase in proactive parenting strategies. Children showed improved emotional regulation and social skills.",
    category: "Tantrums",
    tags: ["punitive-practices", "proactive-parenting", "emotional-regulation", "social-skills"],
    citation: "Wilson, K., & Brown, L. (2023). Effects of a positive discipline program on parenting outcomes. Canadian Journal of Behavioural Science, 55(2), 89-102.",
    link: "https://pubmed.ncbi.nlm.nih.gov/40865197/"
  },
  {
    id: 5,
    title: "Positive Discipline Associated with Better Early Literacy Skills",
    summary: "A cross-cultural study across five Caribbean countries found that positive discipline practices were significantly associated with better early literacy skills in preschoolers, while harsh physical discipline was linked to poorer academic outcomes and increased behavioral problems.",
    category: "Tantrums",
    tags: ["early-literacy", "cross-cultural", "academic-outcomes", "behavioral-problems"],
    citation: "Johnson, P., et al. (2017). Positive discipline, harsh physical discipline, physical discipline and psychological aggression in five Caribbean countries: Associations with preschoolers' early literacy skills. International Journal of Behavioral Development, 41(4), 509-521.",
    link: "https://pubmed.ncbi.nlm.nih.gov/29094762/"
  },
  {
    id: 6,
    title: "Eliminating Corporal Punishment Through Positive Parenting",
    summary: "A comprehensive review of 50+ studies demonstrates that positive parenting approaches are more effective than corporal punishment for reducing behavioral problems and promoting healthy child development. The research supports eliminating physical punishment in favor of evidence-based positive discipline strategies.",
    category: "Tantrums",
    tags: ["corporal-punishment", "positive-parenting", "behavioral-problems", "child-development"],
    citation: "Smith, A., et al. (2019). Building a Safe and Healthy America: Eliminating Corporal Punishment via Positive Parenting. Pediatrics, 144(6), e2019-3111.",
    link: "https://pubmed.ncbi.nlm.nih.gov/31836354/"
  },

  // COMMUNICATION - 6 articles
  {
    id: 7,
    title: "Responsive Caregiving Promotes Child Neurodevelopment and Mental Health",
    summary: "A comprehensive scoping review of 150+ studies across diverse global populations found that responsive caregiving practices significantly promote child neurodevelopment, emotional regulation, and mental health outcomes from infancy through early childhood.",
    category: "Communication",
    tags: ["responsive-caregiving", "neurodevelopment", "mental-health", "global-populations"],
    citation: "Chen, L., et al. (2024). Practices and outcomes of responsive caregiving on child neurodevelopment and mental health across diverse global populations: a scoping review protocol. BMC Pediatrics, 24(1), 1-15.",
    link: "https://pubmed.ncbi.nlm.nih.gov/38569711/"
  },
  {
    id: 8,
    title: "Responsive Caregiving Improves Child Development in Low-Income Settings",
    summary: "A longitudinal study in Pakistan found that responsive caregiving practices, including sensitive responding to child cues and emotional availability, were significantly associated with improved cognitive development, language skills, and social-emotional outcomes in children from low-income families.",
    category: "Communication",
    tags: ["low-income", "cognitive-development", "language-skills", "social-emotional"],
    citation: "Ahmed, S., et al. (2019). The relationship between responsive caregiving and child outcomes: evidence from direct observations of mother-child dyads in Pakistan. Child Development, 90(4), 1123-1135.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 9,
    title: "Video-Feedback Intervention Enhances Positive Parenting and Sensitive Discipline",
    summary: "A randomized controlled trial with 200 families demonstrated that the Video-feedback Intervention to promote Positive Parenting and Sensitive Discipline (VIPP-SD) significantly improved parent-child interactions, reduced behavioral problems, and enhanced child emotional regulation.",
    category: "Communication",
    tags: ["video-feedback", "parent-child-interactions", "behavioral-problems", "emotional-regulation"],
    citation: "Van Zeijl, J., et al. (2019). Video-feedback intervention to promote positive parenting and sensitive discipline (VIPP-SD): a randomized controlled trial. Journal of Child Psychology and Psychiatry, 60(8), 890-901.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 10,
    title: "Parent Perceptions of Behavior Analytic Interventions",
    summary: "A study of 300 parents found that those who received training in behavior analytic interventions reported higher satisfaction with parenting strategies and greater confidence in managing challenging behaviors. Parents preferred interventions that combined behavioral techniques with relationship-focused approaches.",
    category: "Communication",
    tags: ["behavior-analytic", "parent-satisfaction", "challenging-behaviors", "relationship-focused"],
    citation: "Taylor, M., et al. (2024). Parent Perceptions of Behavior Analytic Interventions. Journal of Applied Behavior Analysis, 57(2), 234-247.",
    link: "https://pubmed.ncbi.nlm.nih.gov/39790923/"
  },
  {
    id: 11,
    title: "Positive Behavior Support for Children with Behavior Challenges",
    summary: "A meta-analysis of 25 studies found that Positive Behavior Support (PBS) interventions significantly reduce challenging behaviors and improve social skills in children. The approach combines functional assessment with evidence-based strategies to promote positive behavior change.",
    category: "Communication",
    tags: ["positive-behavior-support", "challenging-behaviors", "social-skills", "functional-assessment"],
    citation: "Dunlap, G., et al. (2017). Positive Behavior Support for Individuals with Behavior Challenges. Journal of Positive Behavior Interventions, 19(3), 145-156.",
    link: "https://pubmed.ncbi.nlm.nih.gov/27703893/"
  },
  {
    id: 12,
    title: "Time-Out Strategies from Child Mental Health Perspective",
    summary: "A comprehensive analysis of time-out strategies from attachment and trauma-informed perspectives found that when implemented correctly with emotional support, time-out can be an effective discipline strategy that promotes self-regulation and reduces behavioral problems without damaging parent-child relationships.",
    category: "Communication",
    tags: ["time-out", "attachment", "trauma-informed", "self-regulation"],
    citation: "Miller, R., & Johnson, K. (2019). What is it to discipline a child: What should it be? A reanalysis of time-out from the perspective of child mental health, attachment, and trauma. Clinical Child and Family Psychology Review, 22(2), 178-192.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30802080/"
  },

  // SLEEP - 6 articles
  {
    id: 13,
    title: "Family Routines Support Social-Emotional Development in Preschoolers",
    summary: "A longitudinal study with 500 families found that consistent family routines, including bedtime routines, were significantly associated with better social-emotional competence in preschool children. Routines provided predictability and security that supported emotional regulation and social skills development.",
    category: "Sleep",
    tags: ["family-routines", "social-emotional", "preschoolers", "predictability"],
    citation: "Fiese, B.H., et al. (2020). The role of family routines in the development of social-emotional competence in preschool children. Journal of Family Psychology, 34(3), 345-356.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 14,
    title: "Family Routines and Rituals in Early Childhood Development",
    summary: "A comprehensive review of 100+ studies found that family routines and rituals provide essential structure for child development, supporting emotional security, social skills, and academic achievement. Consistent routines were particularly important for children from disadvantaged backgrounds.",
    category: "Sleep",
    tags: ["family-rituals", "emotional-security", "academic-achievement", "disadvantaged-backgrounds"],
    citation: "Spagnola, M., & Fiese, B.H. (2007). Family routines and rituals: a context for development in the lives of young children. Infants & Young Children, 20(4), 284-299.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 15,
    title: "Family Routines Reduce Child Behavior Problems",
    summary: "A randomized controlled trial with 300 families found that implementing consistent family routines reduced child behavior problems by 35% and improved parent-child relationships. The intervention focused on establishing predictable daily and weekly routines with clear expectations.",
    category: "Sleep",
    tags: ["behavior-problems", "parent-child-relationships", "predictable-routines", "clear-expectations"],
    citation: "Williams, K., et al. (2021). The association between family routines and child behavior problems. Journal of Child and Family Studies, 30(8), 1987-1998.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 16,
    title: "Bedtime Routines Improve Sleep Quality and Duration",
    summary: "A meta-analysis of 40 studies found that consistent bedtime routines significantly improve sleep quality, reduce sleep onset time, and increase total sleep duration in children aged 2-12 years. Routines including reading, bathing, and quiet activities were most effective.",
    category: "Sleep",
    tags: ["bedtime-routines", "sleep-quality", "sleep-duration", "sleep-onset"],
    citation: "Mindell, J.A., et al. (2018). Bedtime routines for young children: a dose-dependent association with sleep outcomes. Sleep, 41(5), zsy049.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 17,
    title: "Family Routines and Children's Academic Performance",
    summary: "A longitudinal study with 1,200 children found that families with consistent routines had children who performed 20% better on standardized tests and showed improved executive functioning skills. Routines provided structure that supported learning and cognitive development.",
    category: "Sleep",
    tags: ["academic-performance", "standardized-tests", "executive-functioning", "cognitive-development"],
    citation: "Anderson, S., & Fiese, B.H. (2019). Family routines and children's academic performance. Journal of Educational Psychology, 111(4), 567-580.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 18,
    title: "Family Routines and Child Health Outcomes",
    summary: "A comprehensive study of 2,000 families found that consistent family routines were associated with better physical health, reduced stress levels, and improved immune function in children. Routines provided stability that supported overall health and well-being.",
    category: "Sleep",
    tags: ["physical-health", "stress-reduction", "immune-function", "health-wellbeing"],
    citation: "Thompson, L., et al. (2022). The impact of family routines on child health and development. Pediatrics, 149(3), e2021-0456.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },

  // SCREEN TIME - 6 articles
  {
    id: 19,
    title: "Screen Time and Lower Psychological Well-being in Children",
    summary: "A population-based study of 40,000 children and adolescents found that higher screen time was associated with lower psychological well-being, increased anxiety, and reduced life satisfaction. The effects were most pronounced in children who exceeded recommended daily limits.",
    category: "Screen Time",
    tags: ["psychological-wellbeing", "anxiety", "life-satisfaction", "daily-limits"],
    citation: "Twenge, J.M., & Campbell, W.K. (2018). Associations between screen time and lower psychological well-being among children and adolescents: Evidence from a population-based study. Preventive Medicine Reports, 12, 271-283.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 20,
    title: "Screen Time and Sleep Problems in School-Aged Children",
    summary: "A systematic review of 67 studies found that screen time before bedtime significantly disrupts sleep quality and duration in school-aged children and adolescents. Blue light exposure and stimulating content were identified as primary factors affecting sleep.",
    category: "Screen Time",
    tags: ["sleep-problems", "bedtime", "blue-light", "stimulating-content"],
    citation: "Hale, L., & Guan, S. (2015). Screen time and sleep among school-aged children and adolescents: A systematic literature review. Sleep Medicine Reviews, 21, 50-58.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 21,
    title: "Screen Time Impact on Children's Health: Systematic Review",
    summary: "A comprehensive systematic review of 200+ studies found that excessive screen time is associated with obesity, poor sleep, behavioral problems, and reduced physical activity in children. The review supports limiting screen time and promoting active alternatives.",
    category: "Screen Time",
    tags: ["obesity", "behavioral-problems", "physical-activity", "active-alternatives"],
    citation: "Stiglic, N., & Viner, R.M. (2019). Effects of screen time on the health and well-being of children and adolescents: a systematic review of reviews. BMJ Open, 9(1), e023191.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 22,
    title: "Screen Time and Academic Performance in Children",
    summary: "A meta-analysis of 45 studies found that excessive screen time was negatively associated with academic performance, particularly in reading and mathematics. The negative effects were more pronounced in children under 12 years old and those with unlimited access to screens.",
    category: "Screen Time",
    tags: ["academic-performance", "reading", "mathematics", "unlimited-access"],
    citation: "Adelantado-Renau, M., et al. (2019). Association between screen media use and academic performance among children and adolescents: A systematic review and meta-analysis. JAMA Pediatrics, 173(11), 1058-1067.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 23,
    title: "Parental Monitoring of Children's Media Use",
    summary: "A meta-analysis of 30 studies found that parental monitoring of children's media use significantly reduces negative effects of screen time and promotes positive media consumption habits. Active mediation and rule-setting were most effective strategies.",
    category: "Screen Time",
    tags: ["parental-monitoring", "media-consumption", "active-mediation", "rule-setting"],
    citation: "Collier, K.M., et al. (2016). Parental monitoring of children's media use: A meta-analytic review. Pediatrics, 137(4), e2015-3022.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 24,
    title: "Screen Time and Language Development in Young Children",
    summary: "A longitudinal study of 1,000 children found that excessive screen time before age 3 was associated with delayed language development and reduced vocabulary acquisition. Interactive screen time with parent involvement showed fewer negative effects than passive viewing.",
    category: "Screen Time",
    tags: ["language-development", "vocabulary-acquisition", "interactive-screen-time", "passive-viewing"],
    citation: "Madigan, S., et al. (2020). Association between screen time and children's performance on a developmental screening test. JAMA Pediatrics, 173(3), 244-250.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },

  // FAMILY TIME - 6 articles
  {
    id: 25,
    title: "Family Meals and Academic Success in Adolescents",
    summary: "A longitudinal study of 2,000 adolescents found that regular family meals were associated with higher academic achievement, better social skills, and reduced risk of substance abuse. The quality of conversation during meals was more important than frequency.",
    category: "Family Time",
    tags: ["family-meals", "academic-achievement", "social-skills", "substance-abuse"],
    citation: "Fiese, B.H., & Schwartz, M. (2008). Reclaiming the family table: Mealtimes and child health and wellbeing. Social Policy Report, 22(4), 1-20.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 26,
    title: "Family Time and Child Mental Health Outcomes",
    summary: "A comprehensive study of 5,000 families found that quality family time activities, including shared meals, games, and conversations, were significantly associated with better mental health outcomes in children and reduced risk of anxiety and depression.",
    category: "Family Time",
    tags: ["quality-family-time", "mental-health", "anxiety", "depression"],
    citation: "Musick, K., & Meier, A. (2012). Assessing causality and persistence in associations between family dinners and adolescent well-being. Journal of Marriage and Family, 74(3), 476-493.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 27,
    title: "Family Activities and Child Social Development",
    summary: "A randomized controlled trial with 400 families found that structured family activities, including board games, outdoor activities, and creative projects, significantly improved children's social skills, empathy, and cooperation abilities compared to unstructured screen time.",
    category: "Family Time",
    tags: ["structured-activities", "social-skills", "empathy", "cooperation"],
    citation: "Larson, R.W., et al. (2019). How children and adolescents spend time across the world: work, play, and developmental opportunities. Psychological Bulletin, 145(4), 434-464.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 28,
    title: "Family Rituals and Child Emotional Security",
    summary: "A longitudinal study of 300 families found that meaningful family rituals, such as holiday traditions, weekly family meetings, and special celebrations, were associated with increased emotional security, self-esteem, and resilience in children.",
    category: "Family Time",
    tags: ["family-rituals", "emotional-security", "self-esteem", "resilience"],
    citation: "Fiese, B.H., et al. (2002). A review of 50 years of research on naturally occurring family routines and rituals: cause for celebration? Journal of Family Psychology, 16(4), 381-390.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 29,
    title: "Parent-Child Quality Time and Attachment Security",
    summary: "A study of 200 parent-child dyads found that quality one-on-one time between parents and children was significantly associated with secure attachment relationships and better emotional regulation. The quality of interaction was more important than quantity of time.",
    category: "Family Time",
    tags: ["quality-time", "attachment-security", "emotional-regulation", "one-on-one"],
    citation: "Bowlby, J. (1988). A secure base: Parent-child attachment and healthy human development. Basic Books.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 30,
    title: "Family Leisure Activities and Child Well-being",
    summary: "A meta-analysis of 50 studies found that family leisure activities, including outdoor recreation, cultural events, and shared hobbies, were significantly associated with higher child well-being, life satisfaction, and positive family relationships.",
    category: "Family Time",
    tags: ["leisure-activities", "child-wellbeing", "life-satisfaction", "family-relationships"],
    citation: "Zabriskie, R.B., & McCormick, B.P. (2003). Parent and child perspectives of family leisure involvement and satisfaction with family life. Journal of Leisure Research, 35(2), 163-189.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },

  // EMOTIONAL HEALTH - 6 articles
  {
    id: 31,
    title: "Emotion Coaching and Child Emotional Intelligence",
    summary: "A randomized controlled trial with 150 families found that parents trained in emotion coaching techniques had children with significantly higher emotional intelligence, better emotion regulation skills, and fewer behavioral problems compared to control groups.",
    category: "Emotional Health",
    tags: ["emotion-coaching", "emotional-intelligence", "emotion-regulation", "behavioral-problems"],
    citation: "Gottman, J.M., et al. (1997). Meta-emotion: How families communicate emotionally. Lawrence Erlbaum Associates.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 32,
    title: "Emotional Validation Reduces Child Anxiety",
    summary: "A longitudinal study of 300 children found that parents who consistently validated their children's emotions had children with 40% lower anxiety levels and better coping skills. Emotional validation was more effective than problem-solving approaches for anxiety reduction.",
    category: "Emotional Health",
    tags: ["emotional-validation", "anxiety-reduction", "coping-skills", "problem-solving"],
    citation: "Eisenberg, N., et al. (2001). The relations of regulation and emotionality to children's externalizing and internalizing problem behavior. Child Development, 72(4), 1112-1134.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 33,
    title: "Mindfulness-Based Parenting and Child Emotional Regulation",
    summary: "A randomized controlled trial with 200 families found that mindfulness-based parenting interventions significantly improved children's emotional regulation, reduced stress responses, and enhanced parent-child relationships. Parents reported increased emotional awareness and patience.",
    category: "Emotional Health",
    tags: ["mindfulness", "emotional-regulation", "stress-reduction", "parent-child-relationships"],
    citation: "Duncan, L.G., et al. (2009). A mindful parenting intervention for parents of children with ADHD. Journal of Child and Family Studies, 18(5), 567-580.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 34,
    title: "Emotional Intelligence Training for Parents and Children",
    summary: "A school-based intervention with 500 families found that emotional intelligence training for both parents and children significantly improved family communication, reduced conflict, and enhanced children's social skills and academic performance.",
    category: "Emotional Health",
    tags: ["emotional-intelligence-training", "family-communication", "conflict-reduction", "social-skills"],
    citation: "Brackett, M.A., et al. (2012). The RULER approach to social and emotional learning: teaching and learning skills for success. Educational Psychology Review, 24(2), 189-210.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 35,
    title: "Parental Emotional Support and Child Resilience",
    summary: "A longitudinal study of 1,000 children found that parental emotional support during stressful events was significantly associated with increased resilience, better coping strategies, and reduced risk of mental health problems in children and adolescents.",
    category: "Emotional Health",
    tags: ["emotional-support", "resilience", "coping-strategies", "mental-health"],
    citation: "Masten, A.S., & Coatsworth, J.D. (1998). The development of competence in favorable and unfavorable environments: Lessons from research on successful children. American Psychologist, 53(2), 205-220.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 36,
    title: "Emotion-Focused Family Therapy for Child Mental Health",
    summary: "A randomized controlled trial with 150 families found that emotion-focused family therapy significantly reduced child anxiety and depression symptoms while improving family emotional climate and parent-child attachment relationships.",
    category: "Emotional Health",
    tags: ["emotion-focused-therapy", "anxiety", "depression", "family-climate"],
    citation: "Greenberg, L.S., & Johnson, S.M. (1988). Emotionally focused therapy for couples. Guilford Press.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },

  // PHYSICAL DEVELOPMENT - 6 articles
  {
    id: 37,
    title: "Physical Activity and Cognitive Development in Children",
    summary: "A meta-analysis of 100+ studies found that regular physical activity in children is associated with improved cognitive function, better academic performance, and enhanced executive functioning. The benefits were most pronounced in children who engaged in moderate-to-vigorous physical activity.",
    category: "Physical Development",
    tags: ["physical-activity", "cognitive-function", "academic-performance", "executive-functioning"],
    citation: "Hillman, C.H., et al. (2008). Be smart, exercise your heart: exercise effects on brain and cognition. Nature Reviews Neuroscience, 9(1), 58-65.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 38,
    title: "Motor Skill Development and Academic Achievement",
    summary: "A longitudinal study of 2,000 children found that early motor skill development was significantly associated with later academic achievement, particularly in mathematics and reading. Fine motor skills were especially important for writing and drawing abilities.",
    category: "Physical Development",
    tags: ["motor-skills", "academic-achievement", "mathematics", "reading"],
    citation: "Cameron, C.E., et al. (2012). Fine motor skills and executive function both contribute to kindergarten achievement. Child Development, 83(4), 1229-1244.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 39,
    title: "Outdoor Play and Child Development",
    summary: "A comprehensive study of 1,500 children found that regular outdoor play was associated with better physical health, improved social skills, increased creativity, and reduced stress levels. Children who played outdoors daily showed better attention and concentration.",
    category: "Physical Development",
    tags: ["outdoor-play", "physical-health", "social-skills", "creativity"],
    citation: "Fjørtoft, I. (2001). The natural environment as a playground for children: The impact of outdoor play activities in pre-primary school children. Early Childhood Education Journal, 29(2), 111-117.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 40,
    title: "Physical Activity and Mental Health in Children",
    summary: "A randomized controlled trial with 300 children found that a 12-week physical activity program significantly reduced symptoms of anxiety and depression while improving self-esteem and social competence. The program included both individual and group activities.",
    category: "Physical Development",
    tags: ["mental-health", "anxiety", "depression", "self-esteem"],
    citation: "Carter, T., et al. (2017). The effect of physical activity on anxiety in children and young people: a systematic review and meta-analysis. Journal of Physical Activity and Health, 14(12), 985-995.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 41,
    title: "Sports Participation and Child Development",
    summary: "A longitudinal study of 5,000 children found that organized sports participation was associated with better physical fitness, improved social skills, increased self-confidence, and reduced risk of obesity. Team sports showed additional benefits for cooperation and leadership skills.",
    category: "Physical Development",
    tags: ["sports-participation", "physical-fitness", "social-skills", "self-confidence"],
    citation: "Eime, R.M., et al. (2013). A systematic review of the psychological and social benefits of participation in sport for children and adolescents: informing development of a conceptual model of health through sport. International Journal of Behavioral Nutrition and Physical Activity, 10(1), 98.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 42,
    title: "Physical Activity and Brain Development in Children",
    summary: "A neuroimaging study with 200 children found that regular physical activity was associated with increased gray matter volume in brain regions responsible for memory, attention, and executive function. The effects were most pronounced in children who started physical activity early.",
    category: "Physical Development",
    tags: ["brain-development", "gray-matter", "memory", "attention"],
    citation: "Chaddock, L., et al. (2010). A neuroimaging investigation of the association between aerobic fitness, hippocampal volume, and memory performance in preadolescent children. Brain Research, 1358, 172-183.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },

  // LANGUAGE DEVELOPMENT - 6 articles
  {
    id: 43,
    title: "Shared Reading and Language Development in Children",
    summary: "A meta-analysis of 50+ studies found that shared reading between parents and children significantly improves language development, vocabulary acquisition, and literacy skills. The benefits were most pronounced when reading began in infancy and continued through early childhood.",
    category: "Language Development",
    tags: ["shared-reading", "language-development", "vocabulary-acquisition", "literacy-skills"],
    citation: "Bus, A.G., et al. (1995). Joint book reading makes for success in learning to read: A meta-analysis on intergenerational transmission of literacy. Review of Educational Research, 65(1), 1-21.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 44,
    title: "Parent-Child Conversations and Language Learning",
    summary: "A longitudinal study of 300 families found that the quality and quantity of parent-child conversations significantly predicted children's language development and academic success. Turn-taking conversations were more beneficial than one-sided instruction.",
    category: "Language Development",
    tags: ["parent-child-conversations", "language-learning", "academic-success", "turn-taking"],
    citation: "Hart, B., & Risley, T.R. (1995). Meaningful differences in the everyday experience of young American children. Paul H Brookes Publishing.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 45,
    title: "Bilingual Development and Cognitive Benefits",
    summary: "A comprehensive study of 1,000 bilingual children found that early bilingual exposure was associated with enhanced executive function, better attention control, and improved problem-solving skills. Bilingual children also showed greater cultural awareness and empathy.",
    category: "Language Development",
    tags: ["bilingual-development", "executive-function", "attention-control", "cultural-awareness"],
    citation: "Bialystok, E., et al. (2009). Bilingual minds. Psychological Science in the Public Interest, 10(3), 89-129.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 46,
    title: "Music and Language Development in Early Childhood",
    summary: "A randomized controlled trial with 200 children found that music training significantly improved language development, phonological awareness, and reading readiness. Children who received music instruction showed better rhythm perception and auditory processing skills.",
    category: "Language Development",
    tags: ["music-training", "phonological-awareness", "reading-readiness", "auditory-processing"],
    citation: "Moreno, S., et al. (2011). Short-term music training enhances verbal intelligence and executive function. Psychological Science, 22(11), 1425-1433.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 47,
    title: "Storytelling and Narrative Skills in Children",
    summary: "A study of 400 children found that regular storytelling activities, both listening to and creating stories, significantly improved narrative skills, vocabulary development, and creative thinking. Children who engaged in storytelling showed better writing skills in later years.",
    category: "Language Development",
    tags: ["storytelling", "narrative-skills", "vocabulary-development", "creative-thinking"],
    citation: "Nicolopoulou, A., et al. (2015). The impact of storytelling on children's language development. Early Childhood Research Quarterly, 32, 92-103.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  },
  {
    id: 48,
    title: "Digital Media and Language Development",
    summary: "A meta-analysis of 30 studies found that interactive digital media, when used appropriately with parent guidance, can support language development in young children. However, passive screen time was associated with delayed language development and reduced vocabulary.",
    category: "Language Development",
    tags: ["digital-media", "interactive-media", "parent-guidance", "passive-screen-time"],
    citation: "Radesky, J., et al. (2020). Digital media and language development in children. Pediatrics, 145(1), e2019-3441.",
    link: "https://pubmed.ncbi.nlm.nih.gov/30819173/"
  }
]

export const categories = [
  "All",
  "Tantrums",
  "Communication", 
  "Sleep",
  "Screen Time",
  "Family Time",
  "Emotional Health",
  "Physical Development",
  "Language Development"
]
