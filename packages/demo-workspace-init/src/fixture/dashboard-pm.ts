import {Prisma} from '@infoportal/prisma'
import {createdBySystem} from '../utils.js'

export const dashboardPm =
  {
    'id': '00000000-0000-0000-1000-000000000000',
    'name': 'Protection Monitoring',
    'createdAt': '2026-01-05T19:34:21.396Z',
    'createdBy': 'visitor.11@nexusportal.app',
    'slug': 'protection_monitoring-2f6a',
    'category': 'Protection',
    'sourceFormId': 'id_form_hhs',
    'workspaceId': '00000000-0000-0000-0000-000000000000',
    'deploymentStatus': 'draft',
    'theme': {
      'dark': false,
      'spacing': 8,
      'cardBlur': 10,
      'fontSize': 14,
      'fontFamily': 'Open Sans',
      'cardBgColor': '#fff',
      'cardOpacity': 6,
      'borderRadius': 12,
      'colorPrimary': '#0094d3',
      'cardElevation': 0,
      'cardBorderSize': 0,
      'colorSecondary': '#1a73e8',
    },
    'isPublic': true,
    'enableChartDownload': true,
    'enableChartFullSize': true,
    'periodComparisonDelta': 90,
  } as const

export const dashboardPmPublished = {
  id: '00000000-0000-0000-1000-100000000000',
  snapshot: {},
  dashboardId: dashboardPm.id,
  publishedBy: createdBySystem,
}

export const dashboardPmSection = [
  {
    'id': '00000000-0000-0000-1010-000000000000',
    'title': 'Sample',
    'createdAt': '2026-01-05T19:34:33.405Z',
    'dashboardId': dashboardPm.id,
  },
  {
    'id': '00000000-0000-0000-1020-000000000000',
    'title': 'Displacement',
    'createdAt': '2026-01-05T19:48:54.254Z',
    'dashboardId': dashboardPm.id,
  },
]

export const dashboardPmWidgets: Prisma.DashboardWidgetCreateManyInput[] = [
  {
    'id': '1150c4bc-a829-447e-89a9-ac866e1a84c0',
    'type': 'BarChart',
    'i18n_title': [
      'Household Status',
      'Який тип вашого домогосподарства?',
    ],
    'description': null,
    'position': {
      'h': 16,
      'w': 6,
      'x': 6,
      'y': 5,
    },
    'config': {
      'mapping': {
        '​': [
          null,
        ],
        'extended_family': [
          'ded family',
        ],
        'couple_with_children': [
          'Couple with children',
        ],
        'father_with_children': [
          'Father with children',
        ],
        'mother_with_children': [
          'Mother with children',
        ],
        'one_person_household': [
          'One person household',
        ],
        'couple_without_children': [
          'Couple without children',
        ],
      },
      'questionName': 'household_type',
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': '1329b313-5ddb-4c0c-8d8a-4376d3ad1db2',
    'type': 'Card',
    'i18n_title': [
      'Individuals',
      'Скільки осіб, включно з респондентом, входить до складу домогосподарства?',
    ],
    'description': null,
    'position': {
      'h': 5,
      'w': 3,
      'x': 3,
      'y': 0,
    },
    'config': {
      'icon': 'person',
      'operation': 'sum',
      'questionName': 'household_size',
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': 'cc3f7e92-199c-4ce5-baa9-414242119016',
    'type': 'GeoChart',
    'i18n_title': [
      'Oblast of origin ➡️',
      'Область',
    ],
    'description': null,
    'position': {
      'h': 13,
      'w': 3,
      'x': 0,
      'y': 3,
    },
    'config': {
      'mapping': {},
      'questionName': 'origin_oblast',
      'countryIsoCode': 'UA',
    },
    'sectionId': '00000000-0000-0000-1020-000000000000',
  },
  {
    'id': 'dcbe9e7a-ff09-4e6f-997d-eb02256d499f',
    'type': 'Card',
    'i18n_title': [
      'Households',
    ],
    'description': null,
    'position': {
      'h': 5,
      'w': 3,
      'x': 0,
      'y': 0,
    },
    'config': {
      'icon': 'home',
      'operation': 'count',
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': 'b4a0355e-5a90-4bbc-8f9d-e65f497a70e9',
    'type': 'GeoChart',
    'i18n_title': [
      '➡️ Current living Oblast',
      'Область',
    ],
    'description': null,
    'position': {
      'h': 13,
      'w': 3,
      'x': 3,
      'y': 3,
    },
    'config': {
      'mapping': {},
      'questionName': 'current_oblast',
      'countryIsoCode': 'UA',
    },
    'sectionId': '00000000-0000-0000-1020-000000000000',
  },
  {
    'id': 'ab125990-f2b2-43e9-adaf-7966a28dc493',
    'type': 'Card',
    'i18n_title': [
      'Household Size',
      'Скільки осіб, включно з респондентом, входить до складу домогосподарства?',
    ],
    'description': null,
    'position': {
      'h': 5,
      'w': 3,
      'x': 6,
      'y': 0,
    },
    'config': {
      'icon': 'group',
      'operation': 'avg',
      'questionName': 'household_size',
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': '20092d76-4f33-4249-85b2-7c1a84537a3c',
    'type': 'Card',
    'i18n_title': [
      'Average Age',
      '3.2.2 Bкажіть ВІК члена домогосподарства',
    ],
    'description': null,
    'position': {
      'h': 5,
      'w': 3,
      'x': 9,
      'y': 0,
    },
    'config': {
      'icon': 'elderly',
      'operation': 'avg',
      'questionName': 'age',
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': 'b476a7a4-3265-4086-86b1-66e32ce04116',
    'type': 'Alert',
    'i18n_title': [
      'IDP population by oblast of origin and displacement',
    ],
    'description': null,
    'position': {
      'h': 3,
      'w': 6,
      'x': 0,
      'y': 0,
    },
    'config': {
      'type': '',
      'i18n_content': [
        null,
      ],
    },
    'sectionId': '00000000-0000-0000-1020-000000000000',
  },
  {
    'id': 'e4885fde-39f8-4a1e-aac8-6965f51f562d',
    'type': 'GeoChart',
    'i18n_title': [
      'Households Location',
      'Область',
    ],
    'description': null,
    'position': {
      'h': 24,
      'w': 6,
      'x': 0,
      'y': 5,
    },
    'config': {
      'mapping': {},
      'questionName': 'current_oblast',
      'countryIsoCode': 'UA',
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': '1a646ec3-2bdf-419f-bb80-2c89f41d1d16',
    'type': 'LineChart',
    'i18n_title': [],
    'description': null,
    'position': {
      'h': 15,
      'w': 6,
      'x': 0,
      'y': 16,
    },
    'config': {
      'lines': [
        {
          'i18n_label': [
            'When did you leave?',
            'Коли ви виїхали?',
          ],
          'questionName': 'first_displacement_date',
        },
        {
          'i18n_label': [
            'When did you return?',
            'Коли ви повернулися?',
          ],
          'questionName': 'return_date',
        },
      ],
    },
    'sectionId': '00000000-0000-0000-1020-000000000000',
  },
  {
    'id': '69a0087c-cc4b-4c9a-8ad1-58a9cefaf206',
    'type': 'Table',
    'i18n_title': [
      'Disaggregation',
    ],
    'description': null,
    'position': {
      'h': 14,
      'w': 6,
      'x': 0,
      'y': 29,
    },
    'config': {
      'row': {
        'i18n_label': [
          'Age Groups',
          '3.2.2 Bкажіть ВІК члена домогосподарства',
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
            'max': 59,
            'min': 50,
          },
          {
            'max': 120,
            'min': 60,
          },
        ],
      },
      'column': {
        'i18n_label': [
          '3.2.1 Select the GENDER of HH member',
          '3.2.1 Bкажіть СТАТЬ члена домогосподарства',
        ],
        'questionName': 'gender',
      },
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
  {
    'id': '7a258d8d-eca1-4545-9520-a6022e41419e',
    'type': 'BarChart',
    'i18n_title': [
      'Person of concern',
      'Який ваш статус переміщення?',
    ],
    'description': null,
    'position': {
      'h': 10,
      'w': 6,
      'x': 6,
      'y': 21,
    },
    'config': {
      'limit': '10',
      'mapping': {
        'idp': [
          null,
        ],
        '​': [
          null,
        ],
        'returnee': [
          null,
        ],
        'non_displaced': [
          null,
        ],
      },
      'minValue': '',
      'questionName': 'disp_status',
      'showEvolution': true,
    },
    'sectionId': '00000000-0000-0000-1010-000000000000',
  },
]