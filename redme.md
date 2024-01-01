# Marvel Avengers
## Sobre:
	Este projeto oferece uma interface intuitiva para gestão de grupos de heróis

### Tecnologias utilizadas
- NextJs - 14
- Django - 5.0
- Django Rest Framework
- JWT (Json Web Token)
- Tailwindcss
- Zustand 
- useQuery

### Iniciando o projeto

#### Clone o repositório :
```bash
git clone https://github.com/Igorsaulo/Marvel-Avengers.git
```

##### É importante que inicie o projeto partindo do back-end.


### Iniciando o back-end:

```bash
cd strategiBack
```

#### Instale as dependências do projeto:
```bash
pip install  -r requirements.txt 
```

#### Execute as migrações do banco de dados:
```bash
python manage.py migrate
```

#### Carregue os heróis para o banco de dados:
```bash
python manage.py load_heros
```

#### Agora vamos iniciar o servidor:
```bash
python manage.py runserver
```


### Iniciando o front-end:
```bash
cd strategiFront
```

#### Instale as dependências:
```bash
npm i 
```

#### Iniciando no modo de desenvolvimento:
```bash
npm run dev
```

#### Iniciando no modo de produção:
- ###### Buildando o projeto:
```bash
npm run build
```

- ##### Iniciando o servidor:
```bash
npm start
```

#### Acessando a aplicação:
- Nesta etapa você já cumpriu todos os passos para executar minha aplicação, sua porta de entrada disponível em:
	- http://localhost:3000/register

