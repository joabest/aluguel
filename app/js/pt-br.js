(function () {
  'use strict';

  document.documentElement.lang = 'pt-BR';

  var titles = {
    '/index.html': 'Aluguel de Carros | Encontre seu carro',
    '/listing-grid.html': 'Veículos para Aluguel',
    '/listing-detail-v1.html': 'Detalhes do Veículo',
    '/about-us.html': 'Sobre Nós | Aluguel de Carros',
    '/contact.html': 'Contato | Aluguel de Carros'
  };
  var path = window.location.pathname.replace(/\/$/, '/index.html');
  Object.keys(titles).some(function (key) {
    if (path.endsWith(key)) { document.title = titles[key]; return true; }
    return false;
  });

  var pt = {
    'Home': 'Início',
    'Vehicles': 'Veículos',
    'Vehicle': 'Veículo',
    'Listing Car': 'Veículos',
    'Listing list': 'Lista de veículos',
    'Listing grid': 'Veículos',
    'Listing grid V1': 'Veículos',
    'Listing grid V2': 'Veículos',
    'Listing grid map': 'Veículos no mapa',
    'Listing map V1': 'Mapa de veículos',
    'Listing map V2': 'Mapa de veículos',
    'Listing detail': 'Detalhes do veículo',
    'Listing detail V1': 'Detalhes do veículo',
    'Listing detail V2': 'Detalhes do veículo',
    'Listing detail V3': 'Detalhes do veículo',
    'Listing detail V4': 'Detalhes do veículo',
    'Listing detail V5': 'Detalhes do veículo',
    'Page': 'Páginas',
    'About Us': 'Sobre nós',
    'About us': 'Sobre nós',
    'Contact': 'Contato',
    'Contact us': 'Fale conosco',
    'Contact Us': 'Fale conosco',
    'Faq\'s': 'Perguntas frequentes',
    'FAQs': 'Perguntas frequentes',
    'Pricing': 'Preços',
    'Dashboard': 'Painel',
    'Blog': 'Blog',
    'Blog List': 'Lista do blog',
    'Blog Grid': 'Blog',
    'Blog Detail': 'Artigo',
    'Login': 'Entrar',
    'Register': 'Cadastrar',
    'Account': 'Conta',
    'Forgot password': 'Esqueci minha senha',
    'Password': 'Senha',
    'Confirm password': 'Confirmar senha',
    'User name': 'Nome de usuário',
    'Sign Up': 'Criar conta',
    'or login with': 'ou entre com',
    'or Register with': 'ou cadastre-se com',
    'Don’t you have an account?': 'Ainda não tem uma conta?',
    'Add listing': 'Adicionar veículo',
    'Compare': 'Comparar',
    'Featured': 'Destaque',
    'View car': 'Ver veículo',
    'View all': 'Ver todos',
    'View more reviews': 'Ver mais avaliações',
    'Used car': 'Carro usado',
    'Used Car': 'Usado',
    'New Car': 'Novo',
    'All Car': 'Todos os carros',
    'Used cars for sale': 'Carros disponíveis',
    'Popular used car': 'Carros populares',
    'Recommended Used Cars': 'Carros recomendados',
    'Recommended Used Cars For You': 'Carros recomendados para você',
    'Showing 26 more cars you might like': 'Veja mais carros que podem interessar',
    'Make': 'Marca',
    'Model': 'Modelo',
    'Models': 'Modelos',
    'Body': 'Carroceria',
    'Body Type': 'Tipo de carroceria',
    'Fuel Type': 'Combustível',
    'Fuel type': 'Combustível',
    'Transmission': 'Câmbio',
    'Driver type': 'Tração',
    'Color': 'Cor',
    'Door': 'Portas',
    'Seat': 'Lugares',
    'Ownership': 'Proprietários',
    'Automatic': 'Automático',
    'Manual': 'Manual',
    'Diesel': 'Diesel',
    'Gasoline': 'Gasolina',
    'Petrol': 'Gasolina',
    'Electric': 'Elétrico',
    'Hybrid': 'Híbrido',
    'Sedan': 'Sedã',
    'Hatchback': 'Hatch',
    'Convertible': 'Conversível',
    'Pickup Truck': 'Picape',
    'Minivan': 'Minivan',
    'Coupe': 'Cupê',
    'Crossover': 'Crossover',
    'Luxury': 'Luxo',
    'Other': 'Outro',
    'Red': 'Vermelho',
    'Black': 'Preto',
    'White': 'Branco',
    'Green': 'Verde',
    'Blue,Gray': 'Azul, Cinza',
    '2 Door': '2 portas',
    '4 Door': '4 portas',
    '6 Door': '6 portas',
    '8 Door': '8 portas',
    '2 Seat': '2 lugares',
    '4 Seat': '4 lugares',
    '6 Seat': '6 lugares',
    '8 Seat': '8 lugares',
    'Find cars': 'Encontrar carros',
    'Search for your favorite car': 'Encontre o carro ideal para você',
    'Search inventory': 'Ver veículos',
    'Browse inventory': 'Ver veículos disponíveis',
    'Search by body': 'Buscar por carroceria',
    'Used Cars By Body Type': 'Carros por tipo de carroceria',
    'What would you like to find?': 'Qual carro você procura?',
    'Find your dream car easily and quickly': 'Encontre o carro ideal com facilidade e rapidez',
    'Browse thousands of new and used cars from all reputable brands on the market.': 'Encontre veículos de diversas marcas, categorias e faixas de preço.',
    'Find the ideal car for you and browse our affordable inventory.': 'Encontre o carro ideal para sua viagem e confira as opções disponíveis.',
    'Are you looking for a car?': 'Procurando um carro para alugar?',
    'Save time and effort as you no longer need to visit multiple stores to find the right car.': 'Economize tempo encontrando o carro certo para sua necessidade em um só lugar.',
    'Do you want to sell a car?': 'Precisa de um carro para sua próxima viagem?',
    'Find your perfect car match and sell your car quickly with our user-friendly online service.': 'Encontre a opção ideal com uma experiência simples, rápida e prática.',
    'Get An Offer': 'Consultar disponibilidade',
    'What\'s your car worth? Get the best value for your vehicle.': 'Consulte disponibilidade, período e valores para sua locação.',
    'Get trade-in Value': 'Consultar agora',
    'Apply For Financing': 'Faça sua reserva',
    'Fill out our credit approval form for your next used vehicle loan.': 'Escolha o veículo e envie os dados da sua reserva.',
    'Apply Now': 'Reservar agora',
    'Expert Service': 'Atendimento especializado',
    'Expert technicians will keep your vehicle in top running condition.': 'Nossa equipe acompanha a frota para oferecer segurança e qualidade em cada locação.',
    'Schedule Service': 'Fale conosco',
    'Trending:': 'Em alta:',
    'There Are Currently 17 Results': '17 veículos encontrados',
    'Overview': 'Visão geral',
    'Specs & features': 'Especificações e itens',
    'Recommended cars': 'Veículos recomendados',
    'Loan calculator': 'Simulador',
    'New car reviews': 'Avaliações',
    'Description': 'Descrição',
    'Download brochure': 'Baixar ficha',
    'Condition:': 'Condição:',
    'New': 'Novo',
    'Cylinders:': 'Cilindros:',
    'Stock Number:': 'Código:',
    'Fuel Type:': 'Combustível:',
    'VIN Number:': 'Chassi:',
    'Doors:': 'Portas:',
    'Color:': 'Cor:',
    'Seats:': 'Lugares:',
    'Transmission:': 'Câmbio:',
    'Auto': 'Automático',
    'City MPG:': 'Consumo urbano:',
    'Engine Size:': 'Motor:',
    'Highway MPG:': 'Consumo rodoviário:',
    'Drive Type:': 'Tração:',
    'Features': 'Itens e recursos',
    'Safety': 'Segurança',
    'Interior': 'Interior',
    'Exterior': 'Exterior',
    'Comfort & Convenience': 'Conforto e conveniência',
    'Entertainment & Communication': 'Entretenimento e conectividade',
    'Location': 'Localização',
    'Touch Screen': 'Tela sensível ao toque',
    'Alloy Wheels': 'Rodas de liga leve',
    'Fog Lights - Front': 'Faróis de neblina dianteiros',
    'Anti Lock Braking System': 'Freios ABS',
    'Multi-function Steering Wheel': 'Volante multifuncional',
    'Automatic Climate Control': 'Ar-condicionado automático',
    'Power Windows Rear': 'Vidros elétricos traseiros',
    'Engine Start Stop Button': 'Botão Start/Stop',
    'Power Steering': 'Direção assistida',
    'Power Windows Front': 'Vidros elétricos dianteiros',
    'Passenger Airbag': 'Airbag do passageiro',
    'Driver Airbag': 'Airbag do motorista',
    'Air Conditioner': 'Ar-condicionado',
    'Power Adjustable Exterior Rear View Mirror': 'Retrovisores externos com ajuste elétrico',
    'A/C: Front': 'Ar-condicionado dianteiro',
    'Backup Camera': 'Câmera de ré',
    'Cruise Control': 'Controle de cruzeiro',
    'Navigation': 'Navegação',
    'Power Locks': 'Travas elétricas',
    'Entertainment': 'Entretenimento',
    'Audio system': 'Sistema de áudio',
    'Touchscreen display': 'Tela multimídia',
    'GPS navigation': 'Navegação GPS',
    'Phone connectivity': 'Conectividade com celular',
    'In-car Wi-Fi': 'Wi-Fi no veículo',
    'Anti-lock brake system (ABS):': 'Sistema de freios ABS:',
    'Electronic stability control (ESC)': 'Controle eletrônico de estabilidade (ESC)',
    'Brake assist (BA)': 'Assistente de frenagem (BA)',
    'Airbags': 'Airbags',
    'Blind spot monitoring system (BSM)': 'Monitoramento de ponto cego (BSM)',
    'Premium leather seats': 'Bancos em couro premium',
    'Wood trim': 'Acabamento em madeira',
    'Mini bar': 'Minibar',
    'Rear seat ventilation system': 'Ventilação dos bancos traseiros',
    'Large infotainment screen': 'Central multimídia ampla',
    'Chrome-plated grill': 'Grade cromada',
    'Smart headlight cluster': 'Conjunto óptico inteligente',
    'Premium wheels': 'Rodas premium',
    'Body character lines': 'Linhas de design da carroceria',
    'High-quality paint': 'Pintura de alta qualidade',
    'Car overview': 'Visão geral do veículo',
    'Car User Reviews & Rating': 'Avaliações do veículo',
    'Overall Rating': 'Avaliação geral',
    'Base on': 'Com base em',
    '372 Reviews': '372 avaliações',
    '372 Rating and Reviews': '372 avaliações',
    'All': 'Todos',
    'Mileage': 'Quilometragem',
    'Performance': 'Desempenho',
    'Looks': 'Visual',
    'Comfort': 'Conforto',
    'Review': 'Avaliação',
    'Review detail': 'Detalhes da avaliação',
    'Leave a Reply': 'Deixe sua avaliação',
    'Your email address will not be published': 'Seu e-mail não será publicado',
    'Save your name, email for the next time review': 'Salvar meu nome e e-mail para a próxima avaliação',
    'Post Comment': 'Publicar comentário',
    'Is this review helpful?': 'Esta avaliação foi útil?',
    'Yes': 'Sim',
    'No': 'Não',
    'Auto Loan Calculator': 'Simulador de locação',
    'Use our calculator to estimate your monthly car payments.': 'Use o simulador para visualizar uma estimativa de valores.',
    'Total Price': 'Valor total',
    'Down payment': 'Entrada',
    'Interest rate': 'Taxa',
    'Down payment amount': 'Valor da entrada',
    'Amount financed': 'Valor calculado',
    'Monthly payment': 'Valor mensal',
    'Apply for a loan': 'Solicitar reserva',
    'Monthly installment payment:': 'Valor mensal:',
    'New car price: $100.000': 'Valor de referência: R$ 100.000',
    'Car Empire': 'Locadora',
    'Verified dealer': 'Empresa verificada',
    'Contact dealer': 'Falar com a locadora',
    'Call to seller': 'Ligar para atendimento',
    'Report this listing': 'Reportar anúncio',
    'Buying and selling cars has': 'Alugar um carro',
    'Buying and selling cars': 'Alugar um carro',
    'never been easier!': 'nunca foi tão fácil!',
    'Buying and selling cars has never been easier!': 'Alugar um carro nunca foi tão fácil!',
    '1 million visits per day': 'Atendimento rápido e prático',
    '7,800 car sellers': 'Veículos para diferentes necessidades',
    'Why Choose Auto Decar': 'Por que escolher nossa locadora',
    'Customized Solutions': 'Soluções sob medida',
    'We pride ourselves on creating personalized strategies to suit your unique goals, ensuring a seamless car selling journey.': 'Oferecemos opções de locação pensadas para diferentes perfis, períodos e necessidades.',
    'Transparent Partnerships': 'Transparência em cada etapa',
    'Transparency is key in our client relationships. We prioritize clear communication and ethical practices, fostering trust and reliability throughout.': 'Priorizamos comunicação clara, condições transparentes e atendimento confiável do início ao fim.',
    'Meet Our Agents': 'Conheça nossa equipe',
    'Become an agent and get the commission you deserve.': 'Conte com uma equipe preparada para ajudar em sua locação.',
    'We love our clients': 'Nossos clientes em primeiro lugar',
    'Our partners': 'Nossos parceiros',
    'Proven Expertise': 'Experiência comprovada',
    'Our experienced team excels in car sales with many years of successfully navigating the market, delivering informed decisions and optimal results.': 'Nossa equipe oferece atendimento especializado para tornar sua experiência de locação simples, segura e eficiente.',
    'About Auto Decar': 'Sobre a locadora',
    'Leading online car buying and selling platform. helps users buy': 'Plataforma de locação de veículos pensada para facilitar sua escolha e reserva.',
    'cars that are right for them': 'Encontre o veículo ideal para cada momento.',
    'Drop Us a Line': 'Envie uma mensagem',
    'Feel free to connect with us through our online channels for updates, news, and more.': 'Entre em contato pelos nossos canais. Estamos prontos para ajudar com dúvidas e reservas.',
    'Phone Numbers': 'Telefones',
    'Name': 'Nome',
    'Subject': 'Assunto',
    'Your Message': 'Sua mensagem',
    'Send Message': 'Enviar mensagem',
    'Send': 'Enviar',
    'Address': 'Endereço',
    'United States': 'Brasil',
    'Infomation:': 'Informações:',
    'Opentime:': 'Horário de atendimento:',
    'Monay - Friday: 08:00 - 20:00': 'Segunda a sexta: 08:00 - 20:00',
    'Saturday - Sunday: 10:00 - 18:00': 'Sábado e domingo: 10:00 - 18:00',
    'Follow Us:': 'Siga-nos:',
    'Share this page:': 'Compartilhe esta página:',
    'Newsletter': 'Novidades',
    'Stay on top of the latest car trends, tips, and tricks for selling your car.': 'Receba novidades, dicas e informações sobre locação de veículos.',
    'Your subscription could not be saved. Please try again.': 'Não foi possível salvar sua inscrição. Tente novamente.',
    'Your subscription has been successful.': 'Inscrição realizada com sucesso.',
    'Email address': 'Endereço de e-mail',
    'Terms': 'Termos',
    'Terms & Conditions': 'Termos e condições',
    'Terms and Conditions': 'Termos e condições',
    'Privacy Policy': 'Política de privacidade',
    'Corporate Policies': 'Políticas da empresa',
    'Investors': 'Institucional',
    'Careers With Us': 'Trabalhe conosco',
    'Help center': 'Central de ajuda',
    'Copyrights': 'Direitos autorais',
    'How it work': 'Como funciona',
    'Car sales trends': 'Dicas sobre carros',
    'Personal loan': 'Locação de veículos',
    'Top 1 Americas': 'Atendimento de qualidade',
    'Largest Auto portal': 'Plataforma de locação',
    'Car Sold': 'Veículos disponíveis',
    'Every 5 minute': 'Reserva simplificada',
    'Offers': 'Ofertas',
    'Stay updated pay less': 'Acompanhe as melhores opções',
    'Decode the right car': 'Escolha o carro certo',
    '© 2024 Auto Decar. All rights reserved': '© 2026. Todos os direitos reservados',
    'Request Price Label': 'Consultar valor',
    'Price:': 'Preço:',
    'Year:': 'Ano:',
    'Video': 'Vídeo',
    'All image': 'Todas as imagens',
    '1st owner': '1º proprietário',
    '3 hours ago': 'há 3 horas',
    'Monthly': 'Mensal',
    '1 months': '1 mês',
    '3 months': '3 meses',
    '6 months': '6 meses',
    '12 months': '12 meses',
    '3 Monthly': '3 meses',
    '6 Monthly': '6 meses',
    '12 Monthly': '12 meses',
    'Administrative Staff': 'Equipe administrativa',
    'News to help choose your car': 'Conteúdos para ajudar na escolha do seu carro',
    'Car reviews': 'Avaliações de carros',
    'First Drives': 'Primeiras impressões',
    'Chat': 'Atendimento',
    'Search...': 'Buscar...'
  };

  var partial = [
    [/\bView car\b/g, 'Ver veículo'],
    [/\bView all\b/g, 'Ver todos'],
    [/\bCar\b/g, 'Carro'],
    [/\bcars\b/g, 'carros'],
    [/\bReviews\b/g, 'Avaliações'],
    [/\bRating\b/g, 'Avaliação'],
    [/\bmonths\b/g, 'meses'],
    [/\bmonth\b/g, 'mês'],
    [/\bkms\b/g, 'km']
  ];

  function translateString(value) {
    if (!value) return value;
    var trimmed = value.trim();
    if (!trimmed) return value;
    var translated = pt[trimmed];
    if (!translated) {
      translated = trimmed;
      partial.forEach(function (rule) { translated = translated.replace(rule[0], rule[1]); });
    }
    if (translated === trimmed) return value;
    var start = value.match(/^\s*/)[0];
    var end = value.match(/\s*$/)[0];
    return start + translated + end;
  }

  function translateRoot(root) {
    var walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentElement;
        if (!p || /^(SCRIPT|STYLE|NOSCRIPT|CODE|PRE|SVG)$/i.test(p.tagName)) return NodeFilter.FILTER_REJECT;
        return /[A-Za-z]/.test(node.nodeValue || '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) { node.nodeValue = translateString(node.nodeValue); });

    (root || document).querySelectorAll('input, textarea, select, option, button, a').forEach(function (el) {
      ['placeholder', 'title', 'aria-label'].forEach(function (attr) {
        if (el.hasAttribute && el.hasAttribute(attr)) el.setAttribute(attr, translateString(el.getAttribute(attr)));
      });
      if (el.tagName === 'INPUT' && /^(button|submit|reset)$/i.test(el.type || '') && el.value) {
        el.value = translateString(el.value);
      }
    });
  }

  function runTranslation() {
    translateRoot(document.body);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runTranslation, { once: true });
  } else {
    runTranslation();
  }

  window.addEventListener('load', function () { setTimeout(runTranslation, 100); });

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType === 1) translateRoot(node);
        else if (node.nodeType === 3 && /[A-Za-z]/.test(node.nodeValue || '')) node.nodeValue = translateString(node.nodeValue);
      });
    });
  });
  if (document.body) observer.observe(document.body, { childList: true, subtree: true });
})();
