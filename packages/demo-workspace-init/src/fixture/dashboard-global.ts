import {createdBySystem} from '../utils.js'
import {formGlobal} from './form-global.js'
import {Prisma} from '@infoportal/prisma'
import {dashboardPmSection, dashboardPmWidgets} from './dashboard-pm'

export const dashboardGlobal =
  {
    'id': '00000000-0000-0000-1001-000000000000',
    'name': 'Global Dashboard',
    'createdAt': '2026-01-05T19:34:21.396Z',
    'createdBy': createdBySystem,
    'slug': 'dashboard_global-2f6a',
    'category': 'Global',
    'sourceFormId': formGlobal.id!,
    'workspaceId': '00000000-0000-0000-0000-000000000000',
    'deploymentStatus': 'draft',
    'theme': {
      'dark': false,
      'spacing': 8,
      'cardBlur': 10,
      'fontSize': 14,
      'fontFamily': 'Open Sans',
      'cardBgColor': '#fff',
      'cardOpacity': 4.5,
      'borderRadius': 12,
      'colorPrimary': '#0094d3',
      'cardElevation': 0,
      'cardBorderSize': 0,
      'colorSecondary': '#1a73e8',
    },
    'isPublic': false,
    'enableChartDownload': true,
    'enableChartFullSize': true,
    'periodComparisonDelta': 90,
  } as const


export const dashboardGlobalSection = [
  {
    'id': '468c2fd1-ae84-41da-a431-b0421b4d0014',
    'title': 'Home',
    'createdAt': '2026-01-08T19:37:01.555Z',
    'dashboardId': dashboardGlobal.id,
  },
]

export const dashboardGlobalWidgets: Prisma.DashboardWidgetCreateManyInput[] = [
  {
    'id': '2cb46acd-71de-40ba-a502-4b5011f90f06',
    'type': 'PieChart',
    'i18n_title': [
      'Females',
      'ЖІНОЧКИ',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 2,
      'x': 0,
      'y': 31,
    },
    'config': {
      'filterBase': {},
      'filterValue': {
        'choices': [
          'female',
        ],
      },
      'questionName': 'gender',
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': 'daac2773-577a-445a-98e7-03a8baa77fcc',
    'type': 'BarChart',
    'i18n_title': [
      'Program',
      'Програма',
    ],
    'description': null,
    'position': {
      'h': 16,
      'w': 6,
      'x': 6,
      'y': 49,
    },
    'config': {
      'questionName': 'program',
      'showEvolution': true,
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': '8bc02395-664c-4da5-a16d-7d67949654c4',
    'type': 'BarChart',
    'i18n_title': [
      'Displacement Status',
      'Статус переміщення',
    ],
    'description': null,
    'position': {
      'h': 13,
      'w': 6,
      'x': 0,
      'y': 52,
    },
    'config': {
      'showValue': false,
      'questionName': 'displacement_status',
      'hiddenChoices': [
        'other',
        '',
      ],
      'showEvolution': true,
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': '5e2ba8fb-c863-4d1f-a58a-c3551be0abc7',
    'type': 'LineChart',
    'i18n_title': [
      '',
      'Подання',
    ],
    'description': null,
    'position': {
      'h': 18,
      'w': 6,
      'x': 6,
      'y': 6,
    },
    'config': {
      'lines': [
        {
          'i18n_label': [
            'Submission time',
            null,
          ],
          'questionName': 'submissionTime',
        },
      ],
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': '32c15a18-502f-4a3e-9478-5961217e2e3c',
    'type': 'BarChart',
    'i18n_title': [
      'Donor',
      'Донор',
    ],
    'description': null,
    'position': {
      'h': 14,
      'w': 6,
      'x': 6,
      'y': 35,
    },
    'config': {
      'questionName': 'donor',
      'showEvolution': true,
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': '43d9ec45-415c-4848-baf4-9e6d8432e5f8',
    'type': 'Card',
    'i18n_title': [
      'Individuals',
      'ФІЗИЧНІ ОСОБИ',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 6,
      'y': 0,
    },
    'config': {
      'icon': 'group',
      'operation': 'sum',
      'questionName': 'persons_count',
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': 'ed0e0068-b639-449b-bbdf-e61d4946dcbf',
    'type': 'Card',
    'i18n_title': [
      'Unique Individuals',
      'УНІКАЛЬНІ ІНДИВІДУАЛИ',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 9,
      'y': 0,
    },
    'config': {
      'icon': 'person',
      'operation': 'count',
      'questionName': 'uniq_id',
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': '09d39905-564d-4845-8023-2aa5f58c0d69',
    'type': 'GeoChart',
    'i18n_title': [
      'Oblast',
      'Область',
    ],
    'description': null,
    'position': {
      'h': 25,
      'w': 6,
      'x': 0,
      'y': 6,
    },
    'config': {
      'mapping': {},
      'questionName': 'oblast',
      'countryIsoCode': 'UA',
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': '45176b63-15dd-42b7-ac9c-75acd44e48bd',
    'type': 'BarChart',
    'i18n_title': [
      'Survey',
      'Опитування',
    ],
    'description': null,
    'position': {
      'h': 11,
      'w': 6,
      'x': 6,
      'y': 24,
    },
    'config': {
      'showValue': true,
      'questionName': 'survey',
      'showEvolution': true,
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': 'd9592e07-059e-4ab8-a8d9-cadfbf56cff6',
    'type': 'Card',
    'i18n_title': [
      'Submissions',
      'ПОДАННЯ',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 3,
      'y': 0,
    },
    'config': {
      'icon': 'table',
      'operation': 'count',
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': 'a51f0af6-d76e-4088-9bcb-417ea41f461d',
    'type': 'Card',
    'i18n_title': [
      'Surveys',
      'ОПИТУВАННЯ',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 3,
      'x': 0,
      'y': 0,
    },
    'config': {
      'icon': 'electrical_services',
      'filter': null,
      'operation': 'count',
      'questionName': 'survey',
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': 'd4838ba5-67b4-4f8f-ab2d-0b96d41cc87d',
    'type': 'BarChart',
    'i18n_title': [
      '👥 Duplicated Tax IDs',
      '👥 Дублікати податкових ідентифікаційних номерів',
    ],
    'description': null,
    'position': {
      'h': 23,
      'w': 6,
      'x': 6,
      'y': 65,
    },
    'config': {
      'limit': '8',
      'minValue': '3',
      'showValue': true,
      'questionName': 'tax_id',
      'hiddenChoices': [
        '​',
      ],
      'showEvolution': false,
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': '0c437ab1-3eaa-45cb-94d4-782ee946ece9',
    'type': 'PieChart',
    'i18n_title': [
      'Males',
      'ЧОЛОВІКИ',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 2,
      'x': 2,
      'y': 31,
    },
    'config': {
      'filterBase': {},
      'filterValue': {
        'choices': [
          'male',
        ],
      },
      'questionName': 'gender',
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': '638662d3-b962-4ff2-9b40-43d6189d7508',
    'type': 'Card',
    'i18n_title': [
      'Age Average',
      'Вік',
    ],
    'description': null,
    'position': {
      'h': 6,
      'w': 2,
      'x': 4,
      'y': 31,
    },
    'config': {
      'icon': 'elderly',
      'operation': 'avg',
      'questionName': 'age',
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': '7b6cd1f0-b1f6-4140-af05-8f2b245020ae',
    'type': 'BarChart',
    'i18n_title': [
      'Disability',
      'Інвалідність',
    ],
    'description': null,
    'position': {
      'h': 20,
      'w': 6,
      'x': 0,
      'y': 65,
    },
    'config': {
      'questionName': 'disability',
      'showEvolution': true,
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
  {
    'id': '4a2e7ff2-c6dc-4676-b1c9-dba75b63183c',
    'type': 'Table',
    'i18n_title': [
      'Age groups',
      'Вікові групи',
    ],
    'description': null,
    'position': {
      'h': 15,
      'w': 6,
      'x': 0,
      'y': 37,
    },
    'config': {
      'row': {
        'i18n_label': [
          'Age',
          'Вік',
        ],
        'questionName': 'age',
        'rangesIfTypeNumber': [
          {
            'max': 4,
            'min': 0,
          },
          {
            'max': 17,
            'min': 5,
          },
          {
            'max': 49,
            'min': 18,
          },
          {
            'max': 200,
            'min': 50,
          },
        ],
      },
      'column': {
        'i18n_label': [
          'Gender',
          'Стать',
        ],
        'questionName': 'gender',
      },
    },
    'sectionId': '468c2fd1-ae84-41da-a431-b0421b4d0014',
  },
]

export const dashboardGlobalPublished = {
  id: '00000000-0000-0000-1001-100000000000',
  snapshot: dashboardGlobalSection.map(section => {
    return {
      ...section,
      widgets: dashboardGlobalWidgets.filter(_ => section.id === _.sectionId),
    }
  }) as any,
  dashboardId: dashboardGlobal.id,
  publishedBy: createdBySystem,
}
