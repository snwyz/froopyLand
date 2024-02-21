module.exports = {
  types: [
    { value: 'feat', name: 'feat: Добавление нового функционала' },
    { value: 'fix', name: 'fix:  Исправление ошибок' },
    {
      value: 'build',
      name: 'build: Сборка проекта или изменения внешних зависимостей',
    },
    { value: 'ci', name: 'ci: Настройка CI и работа со скриптами' },
    { value: 'docs', name: 'docs: Обновление документации' },
    {
      value: 'perf',
      name: 'perf: Изменения направленные на улучшение производительности',
    },
    {
      value: 'refactor',
      name: 'refactor: Правки кода без исправления ошибок или добавления новых функций',
    },
    { value: 'revert', name: 'revert: Откат на предыдущие коммиты' },
    { value: 'test', name: 'test: Добавление тестов' },
    {
      value: 'style',
      name: 'style: Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)',
    },
  ],

  scopes: [
    { name: '@components' },
    { name: '@features' },
  ],

  messages: {
    type: 'Какие изменения вы вносите?',
    scope: '\nВыберите ОБЛАСТЬ, которую вы изменили (опционально):',
    customScope: 'Укажите свою ОБЛАСТЬ:',
    subject:
      'Напишите КОРОТКОЕ описание в ПОВЕЛИТЕЛЬНОМ наклонении: (пример: add new widget "block-utp") \n',
    body: 'Напишите ПОДРОБНОЕ описание (опционально). Используйте "|" для новой строки:\n',
    breaking: 'Список BREAKING CHANGES (опционально):\n',
    footer:
      'Место для мета данных (Jira-тикет). Например: CLV20-75, REL20-83:\n',
    confirmCommit: 'Вас устраивает получившийся коммит?',
  },

  allowCustomScopes: true,

  allowBreakingChanges: false,

  footerPrefix: 'Ticket: ',

  subjectLimit: 72,
}
