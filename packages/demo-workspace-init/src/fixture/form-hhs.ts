import {createdBySystem, demoWorkspaceId} from '../utils.js'
import {Api} from '@infoportal/api-sdk'
import {Prisma} from '@infoportal/prisma'

// // Write your transformation here
// return {
//   oblast: submission.answers.oblast,
//   office: getOffice(submission.answers.oblast),
//   sector: getSector(submission.answers.program),
//   program: submission.answers.program,
//   persons: submission.answers.person?.map((person, index) => {
//     return {
//       age: person.age,
//       disability: person.disability?.filter(dis => dis !== 'diff_none'),
//       gender: person.gender,
//       tax_id: index === 0 ? submission.answers.taxid : undefined,
//     }
//   })
// }
// }
//
// function getSector(program:  Input.Choice<'program'>): Output.Choice<'sector'> {
//   switch(program) {
//     case 'esk': {
//       return 'shelter'
//     }
//     case 'mpca':
//     case 'nfi': {
//       return 'basic_needs'
//     }
//   }
// }
//
// function getOffice(oblast: Input.Choice<'oblast'>): Output.Choice<'office'> | undefined {
//   switch(oblast) {
//     case 'UA74': {
//       return 'chernihiv'
//     }
//     case 'UA59': {
//       return 'sumy'
//     }
//     case 'UA12':
//     case 'UA23': {
//       return 'dnipro'
//     }
//     case 'UA48':
//     case 'UA65': {
//       return 'mykolaiv'
//     }
//     case 'UA63':
//     case 'UA53': {
//       return 'kharkiv'
//     }
//   }
// }

export const formHhs: Prisma.FormCreateManyInput = {
  name: 'Household Survey',
  type: 'internal',
  workspaceId: demoWorkspaceId,
  category: 'Protection',
  deploymentStatus: 'deployed',
  id: 'id_form_hhs',
  uploadedBy: createdBySystem,
}

export const formHhsSchema: Api.Form.Schema = {
  'survey': [
    {
      'name': 'context',
      'type': 'begin_group',
      '$kuid': '37b939bb3f',
      'label': [
        'Context',
        'Контекст',
      ],
      '$xpath': 'context',
    },
    {
      'name': 'back_office',
      'type': 'select_one',
      '$kuid': '677fbc6b91',
      'label': [
        'Office',
        'Оберіть офіс',
      ],
      '$xpath': 'context/back_office',
      'required': true,
      'select_from_list_name': 'office',
    },
    {
      'name': 'donor',
      'type': 'select_one',
      '$kuid': '6e7a69e9e8',
      'label': [
        'Donor',
        'Донор',
      ],
      '$xpath': 'context/donor',
      'required': true,
      'select_from_list_name': 'donor',
    },
    {
      'type': 'end_group',
      '$kuid': '7833d2339b',
    },
    {
      'name': 'bio',
      'type': 'begin_group',
      '$kuid': '9f5d9d1a98',
      'label': [
        'Basic bio data',
        'Основні біодані',
      ],
      '$xpath': 'bio',
    },
    {
      'name': 'current_oblast',
      'type': 'select_one',
      '$kuid': '549eaca2e2',
      'label': [
        'Current living Oblast',
        'Область',
      ],
      '$xpath': 'bio/current_oblast',
      'required': 'true',
      'appearance': 'minimal',
      'select_from_list_name': 'oblast',
    },
    {
      'name': 'current_raion',
      'type': 'select_one',
      '$kuid': '5dbe3d1334',
      'label': [
        'Current living Raion',
        'Район',
      ],
      '$xpath': 'bio/current_raion',
      'required': 'true',
      'appearance': 'minimal',
      'choice_filter': 'tag=${current_oblast}',
      'select_from_list_name': 'raion',
    },
    {
      'hint': [
        null,
        true,
      ],
      'name': 'citizenship',
      'type': 'select_one',
      '$kuid': '33d74d6b9f',
      'label': [
        'Citizenship',
        'Громадянство',
      ],
      '$xpath': 'bio/citizenship',
      'select_from_list_name': 'citizenship',
    },
    {
      'name': 'citizen_foreign',
      'type': 'select_one',
      '$kuid': 'c23506c8c4',
      'label': [
        'If non-Ukrainian, what is your citizenship?',
        'Якщо ви не українець, яке ваше громадянство/країна походження?',
      ],
      '$xpath': 'bio/citizen_foreign',
      'relevant': '${citizenship} = \'non_ukrainian\'',
      'required': 'true',
      'select_from_list_name': 'citizen_foreign',
    },
    {
      'type': 'end_group',
      '$kuid': 'e8d7a8ea58',
    },
    {
      'name': 'household ',
      'type': 'begin_group',
      '$kuid': '610791a54d',
      'label': [
        'Household composition',
        'Склад домогосподарства',
      ],
      '$xpath': 'household ',
    },
    {
      'hint': [
        'Read out options. Children are counted regardless of age.',
        'Діти враховуються незалежно від віку',
      ],
      'name': 'household_type',
      'type': 'select_one',
      '$kuid': 'aff6d62883',
      'label': [
        'What is the type of your household?',
        'Який тип вашого домогосподарства?',
      ],
      '$xpath': 'household /household_type',
      'required': 'true',
      'select_from_list_name': 'household_type',
    },
    {
      'hint': [
        'Household is a person or group of persons that usually live and eat together; i.e., from the same pot. This can include living in shared space (a physical structure or compound) and sharing critical resources such as water, hygiene or sanitation facilities, or food preparation areas',
        'Домогосподарство - особа або група осіб, які зазвичай проживають і харчуються разом; тобто з того самого горщика. Це може включати проживання в спільному просторі (фізична структура або комплекс) і спільне використання критично важливих ресурсів, таких як вода, засоби гігієни чи санітарії, або місця приготування їжі',
      ],
      'name': 'household_size',
      'type': 'integer',
      '$kuid': 'fe85fe11f3',
      'label': [
        'How many individuals, including the respondent, are in the household?',
        'Скільки осіб, включно з респондентом, входить до складу домогосподарства?',
      ],
      '$xpath': 'household /household_size',
      'required': 'true',
      'constraint': '. > 0 and . <= 99',
      'constraint_message:en (en)': 'Value does not match the question "type of household"',
      'constraint_message:ua (ua)': 'Значення не відповідає питанню "тип домогосподарства"',
    },
    {
      'name': 'persons',
      'type': 'begin_repeat',
      '$kuid': '0c7a3a4423',
      '$xpath': 'household /persons',
      'appearance': 'field-list',
      'repeat_count': '${household_size}',
    },
    {
      'name': 'gender',
      'type': 'select_one',
      '$kuid': 'a1ab9f2318',
      'label': [
        '3.2.1 Select the GENDER of HH member',
        '3.2.1 Bкажіть СТАТЬ члена домогосподарства',
      ],
      '$xpath': 'household /persons/gender',
      'required': 'true',
      'appearance': 'horizontal-compact',
      'select_from_list_name': 'gender',
    },
    {
      'name': 'age',
      'type': 'integer',
      '$kuid': 'c5c39cae8c',
      'label': [
        '3.2.2 Indicate the AGE of HH member',
        '3.2.2 Bкажіть ВІК члена домогосподарства',
      ],
      '$xpath': 'household /persons/age',
      'required': 'true',
      'constraint': '. >= 0 and . < 150',
    },
    {
      'hint': [
        'Read out options',
        'readout_options',
      ],
      'name': 'disability',
      'type': 'select_multiple',
      '$kuid': '41088d87f6',
      'label': [
        '3.2.3 Indicate if HH member has a lot of difficulty (or cannot do at all) any of the following?',
        '3.2.3. Чи є у вас член сім\'ї, який відчуває великі труднощі (або повністю не спроможний) з чимось з наведеного переліку?',
      ],
      '$xpath': 'household /persons/disability',
      'required': 'true',
      'constraint': 'not(selected(., \'no\') and (selected(., \'wg_seeing_even_if_wearing_glasses\') or selected(., \'wg_hearing_even_if_using_a_hearing_aid\') or selected(., \'wg_walking_or_climbing_steps\') or selected(., \'wg_remembering_or_concentrating\') or selected(., \'wg_selfcare_such_as_washing_all_over_or_dressing\') or selected(., \'wg_using_your_usual_language_have_difficulty_communicating\') or selected(., \'unable_unwilling_to_answer\'))) and not(selected(., \'unable_unwilling_to_answer\') and (selected(., \'no\') or selected(., \'wg_seeing_even_if_wearing_glasses\') or selected(., \'wg_hearing_even_if_using_a_hearing_aid\') or selected(., \'wg_walking_or_climbing_steps\') or selected(., \'wg_remembering_or_concentrating\') or selected(., \'wg_selfcare_such_as_washing_all_over_or_dressing\') or selected(., \'wg_using_your_usual_language_have_difficulty_communicating\')))',
      'select_from_list_name': 'disability',
      'constraint_message:en (en)': 'Cannot have these options checked together.',
      'constraint_message:ua (ua)': 'Ці параметри не можна перевіряти разом.',
    },
    {
      'type': 'end_repeat',
      '$kuid': '559ed7d359',
    },
    {
      'name': 'separated_any',
      'type': 'select_one',
      '$kuid': '8817188979',
      'label': [
        '3.3 Are you separated from any household member?',
        '3.3 Ви відокремлені від когось із членів родини?',
      ],
      '$xpath': 'household /separated_any',
      'select_from_list_name': 'yn',
    },
    {
      'name': 'separated_member',
      'type': 'begin_repeat',
      '$kuid': '5a6c683bff',
      'label': [
        'Separated member',
        'Відокремлений член',
      ],
      '$xpath': 'household /separated_member',
      'relevant': '${separated_any}=\'yes\'',
    },
    {
      'name': 'relative_role',
      'type': 'select_one',
      '$kuid': '8239dc26d9',
      'label': [
        'Who is this household member?',
        'Хто цей член родини?',
      ],
      '$xpath': 'household /separated_member/relative_role',
      'select_from_list_name': 'relative',
    },
    {
      'name': 'current_location',
      'type': 'select_one',
      '$kuid': '6c9838ce8e',
      'label': [
        'Where is this person currently?',
        'Де зараз знаходиться ця особа?',
      ],
      '$xpath': 'household /separated_member/current_location',
      'select_from_list_name': 'location',
    },
    {
      'name': 'reason_left_behind',
      'type': 'select_one',
      '$kuid': 'd8eefb38f5',
      'label': [
        'Why did this person remain in the area of origin?',
        'Чому ця особа залишилася в районі походження? ${current_location}=\'area_of_origin\'',
      ],
      '$xpath': 'household /separated_member/reason_left_behind',
      'select_from_list_name': 'reason',
    },
    {
      'type': 'end_repeat',
      '$kuid': '718060940d',
    },
    {
      'type': 'end_group',
      '$kuid': 'cd04ba080a',
    },
    {
      'name': 'disp_info',
      'type': 'begin_group',
      '$kuid': '1df9dc1f5e',
      'label': [
        'Displacement status and intentions',
        'Статус переміщення та наміри',
      ],
      '$xpath': 'disp_info',
      'appearance': 'field-list w12',
    },
    {
      'name': 'disp_status',
      'type': 'select_one',
      '$kuid': '91b8d607a1',
      'label': [
        'What is your displacement status?',
        'Який ваш статус переміщення?',
      ],
      '$xpath': 'disp_info/disp_status',
      'required': true,
      'select_from_list_name': 'disp_status',
    },
    {
      'name': 'returnee_type',
      'type': 'select_one',
      '$kuid': '84d905691d',
      'label': [
        'You are:',
        'Ви:',
      ],
      '$xpath': 'disp_info/returnee_type',
      'relevant': '${disp_status}=\'returnee\'',
      'required': true,
      'select_from_list_name': 'returnee_type',
    },
    {
      'name': 'origin_label',
      'type': 'note',
      '$kuid': '15566a3547',
      'label': [
        'Place of habitual residence (before displacement)',
        'Місце походження',
      ],
      '$xpath': 'disp_info/origin_label',
      'relevant': '${disp_status}=\'idp\'',
    },
    {
      'name': 'origin_oblast',
      'type': 'select_one',
      '$kuid': '7adcf9aae3',
      'label': [
        'Oblast of origin',
        'Область',
      ],
      '$xpath': 'disp_info/origin_oblast',
      'relevant': '${disp_status}=\'idp\'',
      'required': true,
      'appearance': 'minimal',
      'select_from_list_name': 'oblast',
    },
    {
      'name': 'origin_raion',
      'type': 'select_one',
      '$kuid': '0be1854b3f',
      'label': [
        'Raion of origin',
        'Район',
      ],
      '$xpath': 'disp_info/origin_raion',
      'relevant': '${disp_status}=\'idp\'',
      'required': true,
      'appearance': 'minimal',
      'choice_filter': 'tag=${origin_oblast}',
      'select_from_list_name': 'raion',
    },
    {
      'name': 'leave_reason',
      'type': 'select_multiple',
      '$kuid': '48faffdcee',
      'label': [
        'Why did you leave?',
        'Чому ви виїхали?',
      ],
      '$xpath': 'disp_info/leave_reason',
      'relevant': '${disp_status}=\'idp\'',
      'required': true,
      'select_from_list_name': 'leave_reason',
    },
    {
      'name': 'leave_reason_other',
      'type': 'text',
      '$kuid': '23e424aa4c',
      'label': [
        'Please specify',
        'Будь ласка уточніть',
      ],
      '$xpath': 'disp_info/leave_reason_other',
      'relevant': '${disp_status}=\'idp\' and selected(${leave_reason}, \'other\')',
    },
    {
      'hint': [
        'Approximate date',
        'Приблизна дата',
      ],
      'name': 'leave_date',
      'type': 'date',
      '$kuid': '4032b6a845',
      'label': [
        'When did you leave?',
        'Коли ви виїхали?',
      ],
      '$xpath': 'disp_info/leave_date',
      'relevant': '${disp_status}=\'idp\'',
      'required': true,
      'appearance': 'month-year',
      'constraint': '. < today()',
      'constraint_message:en (en)': 'Date must be in the past',
      'constraint_message:ua (ua)': 'Дата має бути в минулому',
    },
    {
      'name': 'travel_mode',
      'type': 'select_multiple',
      '$kuid': 'ef74670f5e',
      'label': [
        'How did you travel?',
        'Як ви подорожували?',
      ],
      '$xpath': 'disp_info/travel_mode',
      'relevant': '${disp_status}=\'idp\'',
      'required': false,
      'select_from_list_name': 'travel_mode',
    },
    {
      'hint': [
        'Approximate date',
        'Приблизна дата',
      ],
      'name': 'first_displacement_date',
      'type': 'date',
      '$kuid': '9686ff976a',
      'label': [
        'When did you first leave?',
        'Коли ви вперше виїхали?',
      ],
      '$xpath': 'disp_info/first_displacement_date',
      'relevant': '${disp_status}=\'returnee\'',
      'required': true,
      'appearance': 'month-year',
      'constraint': '. < today()',
      'constraint_message:en (en)': 'Date must be in the past',
      'constraint_message:ua (ua)': 'Дата має бути в минулому',
    },
    {
      'hint': [
        'Approximate date',
        'Приблизна дата',
      ],
      'name': 'return_date',
      'type': 'date',
      '$kuid': 'b319655bf2',
      'label': [
        'When did you return?',
        'Коли ви повернулися?',
      ],
      '$xpath': 'disp_info/return_date',
      'relevant': '${disp_status}=\'returnee\'',
      'required': true,
      'appearance': 'month-year',
      'constraint': '. < today()',
      'constraint_message:en (en)': 'Date must be in the past',
      'constraint_message:ua (ua)': 'Дата має бути в минулому',
    },
    {
      'name': 'return_reason',
      'type': 'select_multiple',
      '$kuid': 'ada410fcda',
      'label': [
        'Why did you return?',
        'Чому ви повернулися?',
      ],
      '$xpath': 'disp_info/return_reason',
      'relevant': '${disp_status}=\'returnee\'',
      'required': true,
      'select_from_list_name': 'return_reason',
    },
    {
      'name': 'compensation',
      'type': 'select_one',
      '$kuid': '101eb2aad1',
      'label': [
        'Did you receive any compensation?',
        'Чи отримували ви компенсацію?',
      ],
      '$xpath': 'disp_info/compensation',
      'relevant': '${disp_status}!=\'non_displaced\'',
      'required': true,
      'appearance': 'horizontal-compact',
      'select_from_list_name': 'compensation',
    },
    {
      'name': 'intentions',
      'type': 'select_one',
      '$kuid': 'e92568ff1e',
      'label': [
        'Household intention regarding place of residence',
        'Намір домогосподарства щодо місця проживання',
      ],
      '$xpath': 'disp_info/intentions',
      'required': true,
      'select_from_list_name': 'intentions',
    },
    {
      'name': 'integrate_needs',
      'type': 'select_multiple',
      '$kuid': 'b9ae09dfe2',
      'label': [
        'What would support local integration?',
        'Що допоможе локальній інтеграції?',
      ],
      '$xpath': 'disp_info/integrate_needs',
      'relevant': '${intentions}=\'integrate\'',
      'required': false,
      'select_from_list_name': 'integrate_needs',
    },
    {
      'name': 'return_conditions',
      'type': 'select_multiple',
      '$kuid': 'e6fed98700',
      'label': [
        'What would enable return?',
        'Що дозволить повернення?',
      ],
      '$xpath': 'disp_info/return_conditions',
      'relevant': '${intentions}=\'return_origin\'',
      'required': false,
      'select_from_list_name': 'return_conditions',
    },
    {
      'name': 'relocate_reason',
      'type': 'select_multiple',
      '$kuid': '29518e9745',
      'label': [
        'Why are you planning to relocate?',
        'Чому ви плануєте переїзд?',
      ],
      '$xpath': 'disp_info/relocate_reason',
      'relevant': '${intentions}=\'relocate_ukraine\' or ${intentions}=\'relocate_abroad\'',
      'required': false,
      'select_from_list_name': 'relocate_reason',
    },
    {
      'type': 'end_group',
      '$kuid': 'fa07df067a',
    },
    {
      'name': 'reg_doc',
      'type': 'begin_group',
      '$kuid': '377049d397',
      'label': [
        'Registration and documentation',
        'Реєстрація та документація',
      ],
      '$xpath': 'reg_doc',
      'appearance': 'field-list',
    },
    {
      'name': 'non_ua_docs',
      'type': 'select_multiple',
      '$kuid': '33d3ff41f3',
      'label': [
        'As a non-Ukrainian do you have documentation?',
        'Як неукраїнець чи маєте ви документи?',
      ],
      '$xpath': 'reg_doc/non_ua_docs',
      'relevant': '${citizenship}=\'non_ukrainian\'',
      'required': true,
      'constraint': 'not(selected(.,\'no\') and count-selected(.,\'yes_\')>0)',
      'select_from_list_name': 'non_ua_docs',
      'constraint_message:en (en)': 'Incompatible options selected',
      'constraint_message:ua (ua)': 'Вибрано несумісні варіанти',
    },
    {
      'name': 'stateless_cert',
      'type': 'select_one',
      '$kuid': '5167bac417',
      'label': [
        'Do you have a stateless registration certificate?',
        'Чи маєте ви свідоцтво реєстрації особи без громадянства?',
      ],
      '$xpath': 'reg_doc/stateless_cert',
      'relevant': '${citizenship}=\'stateless\'',
      'required': true,
      'select_from_list_name': 'stateless_cert',
    },
    {
      'name': 'idp_registered',
      'type': 'select_one',
      '$kuid': 'bc4200843a',
      'label': [
        'Are you and your household members registered as IDPs?',
        'Чи зареєстровані ви та ваше домогосподарство як ВПО?',
      ],
      '$xpath': 'reg_doc/idp_registered',
      'required': true,
      'select_from_list_name': 'idp_registered',
    },
    {
      'name': 'hh_doc',
      'type': 'begin_repeat',
      '$kuid': '7ca728482b',
      'label': [
        'Household member documentation',
        'Документи члена домогосподарства',
      ],
      '$xpath': 'reg_doc/hh_doc',
      'appearance': 'field-list',
      'constraint': '${disp_status}=\'idp\' and ${idp_registered}=\'no_some\'',
      'repeat_count': '${household_size}',
    },
    {
      'name': 'member_registered',
      'type': 'select_one',
      '$kuid': 'a2db1e7420',
      'label': [
        'Is the member registered as IDP?',
        'Чи зареєстрований член?',
      ],
      '$xpath': 'reg_doc/hh_doc/member_registered',
      'required': true,
      'appearance': 'horizontal-compact',
      'select_from_list_name': 'member_registered',
    },
    {
      'name': 'missing_doc',
      'type': 'select_multiple',
      '$kuid': 'f4ff8f7081',
      'label': [
        'Which documents does the member lack?',
        'Яких документів бракує?',
      ],
      '$xpath': 'reg_doc/hh_doc/missing_doc',
      'required': true,
      'select_from_list_name': 'missing_doc',
    },
    {
      'type': 'end_repeat',
      '$kuid': 'e05fdacc43',
    },
    {
      'name': 'idp_docs',
      'type': 'select_multiple',
      '$kuid': 'd2caf7de60',
      'label': [
        'Do you have any of the following IDP documents?',
        'Чи маєте ви будь-які з таких документів?',
      ],
      '$xpath': 'reg_doc/idp_docs',
      'relevant': '${disp_status}=\'idp\'',
      'required': true,
      'select_from_list_name': 'idp_docs',
    },
    {
      'name': 'idp_allowance',
      'type': 'select_one',
      '$kuid': 'e1efc870e7',
      'label': [
        'Do you receive the IDP allowance?',
        'Чи отримуєте ви допомогу ВПО?',
      ],
      '$xpath': 'reg_doc/idp_allowance',
      'required': true,
      'appearance': 'horizontal-compact',
      'constraint': '${disp_status}=\'idp\'',
      'select_from_list_name': 'idp_allowance',
    },
    {
      'name': 'no_allowance_reason',
      'type': 'select_one',
      '$kuid': '68223d298d',
      'label': [
        'Why do you not receive the IDP allowance?',
        'Чому ви не отримуєте допомогу ВПО?',
      ],
      '$xpath': 'reg_doc/no_allowance_reason',
      'relevant': '${disp_status}=\'idp\' and ${idp_allowance}=\'no\'',
      'required': true,
      'select_from_list_name': 'no_allowance_reason',
    },
    {
      'name': 'no_allowance_other',
      'type': 'text',
      '$kuid': '975f3a7941',
      'label': [
        'Please specify',
        'Будь ласка уточніть',
      ],
      '$xpath': 'reg_doc/no_allowance_other',
      'relevant': '${disp_status}=\'idp\' and ${idp_allowance}=\'no\' and selected(${no_allowance_reason},\'other\')',
    },
    {
      'name': 'not_registered_reason',
      'type': 'select_multiple',
      '$kuid': '3cfb7ad4cc',
      'label': [
        'Why are you not registered as an IDP?',
        'Чому ви не зареєстровані як ВПО?',
      ],
      '$xpath': 'reg_doc/not_registered_reason',
      'relevant': '${disp_status}=\'idp\' and (${idp_registered}=\'none\' or ${idp_registered}=\'no_some\')',
      'required': true,
      'select_from_list_name': 'not_registered_reason',
    },
    {
      'name': 'not_registered_other',
      'type': 'text',
      '$kuid': '9c76f34fa6',
      'label': [
        'Please specify',
        'Будь ласка уточніть',
      ],
      '$xpath': 'reg_doc/not_registered_other',
      'relevant': 'selected(${not_registered_reason},\'other\')',
    },
    {
      'name': 'rejected_reason',
      'type': 'select_one',
      '$kuid': '7eb73833ae',
      'label': [
        'Why was registration rejected or not allowed?',
        'Чому було відмовлено або немає права реєстрації?',
      ],
      '$xpath': 'reg_doc/rejected_reason',
      'relevant': 'selected(${not_registered_reason},\'rejected\') or selected(${not_registered_reason},\'not_entitled\')',
      'required': true,
      'select_from_list_name': 'rejected_reason',
    },
    {
      'name': 'rejected_other',
      'type': 'text',
      '$kuid': 'dedb2e26ae',
      'label': [
        'Please specify',
        'Будь ласка уточніть',
      ],
      '$xpath': 'reg_doc/rejected_other',
      'relevant': 'selected(${rejected_reason},\'other\')',
    },
    {
      'name': 'hlp_missing',
      'type': 'select_multiple',
      '$kuid': 'e4c052d4ce',
      'label': [
        'Which housing land or property documents do you lack?',
        'Яких документів на житло землю або майно бракує?',
      ],
      '$xpath': 'reg_doc/hlp_missing',
      'required': true,
      'appearance': 'minimal',
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'hlp_missing',
      'constraint_message:en (en)': 'Cannot select none with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «немає» разом з іншими',
    },
    {
      'name': 'hlp_missing_other',
      'type': 'text',
      '$kuid': 'b4a3246bc9',
      'label': [
        'Please specify',
        'Будь ласка уточніть',
      ],
      '$xpath': 'reg_doc/hlp_missing_other',
      'relevant': 'selected(${hlp_missing},\'other\')',
    },
    {
      'name': 'doc_barriers',
      'type': 'select_multiple',
      '$kuid': 'e38fffa956',
      'label': [
        'Have you faced barriers accessing documentation?',
        'Чи стикалися ви з перешкодами в отриманні документів?',
      ],
      '$xpath': 'reg_doc/doc_barriers',
      'required': true,
      'select_from_list_name': 'doc_barriers',
      'constraint_message:en (en)': 'Cannot select no with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «ні» разом з іншими',
    },
    {
      'name': 'doc_barriers_other',
      'type': 'text',
      '$kuid': '9bae953032',
      'label': [
        'Please specify',
        'Будь ласка уточніть',
      ],
      '$xpath': 'reg_doc/doc_barriers_other',
      'relevant': 'selected(${doc_barriers},\'other\')',
    },
    {
      'type': 'end_group',
      '$kuid': '78626c1e65',
    },
    {
      'name': 'safety_move',
      'type': 'begin_group',
      '$kuid': '523bdb4bff',
      'label': [
        'Safety & Movement',
        'Безпека та пересування',
      ],
      '$xpath': 'safety_move',
      'required': false,
      'appearance': 'field-list w12',
    },
    {
      'hint': [
        'Read out options',
        'Зачитайте варіанти',
      ],
      'name': 'safety_level',
      'type': 'select_one',
      '$kuid': '32bec29401',
      'label': [
        'Please rate your sense of safety in this location',
        'Будь ласка оцініть своє відчуття безпеки в цьому місці',
      ],
      '$xpath': 'safety_move/safety_level',
      'required': true,
      'select_from_list_name': 'safety_level',
    },
    {
      'hint': [
        'Do not read out options',
        'Не зачитуйте варіанти',
      ],
      'name': 'unsafe_factors',
      'type': 'select_multiple',
      '$kuid': 'f6c86d2be4',
      'label': [
        'Main factors making this location unsafe',
        'Основні фактори небезпеки в цьому місці',
      ],
      '$xpath': 'safety_move/unsafe_factors',
      'relevant': '${safety_level}=\'_1_very_unsafe\' or ${safety_level}=\'_2_unsafe\'',
      'required': true,
      'constraint': 'not(selected(.,\'unable_unwilling_to_answer\') and count(.)>1)',
      'select_from_list_name': 'unsafe_factors',
      'constraint_message:en (en)': 'Cannot select together',
      'constraint_message:ua (ua)': 'Ці параметри не можна перевіряти разом',
    },
    {
      'hint': [
        'Read out options',
        'Зачитайте варіанти',
      ],
      'name': 'community_rel',
      'type': 'select_one',
      '$kuid': '0c7df344c3',
      'label': [
        'Relations between host community and IDPs/returnees',
        'Стосунки між приймаючою громадою та ВПО/поверненими',
      ],
      '$xpath': 'safety_move/community_rel',
      'required': true,
      'select_from_list_name': 'community_rel',
    },
    {
      'name': 'rel_factors',
      'type': 'select_multiple',
      '$kuid': 'aaa0ab976b',
      'label': [
        'Factors affecting community relations',
        'Фактори що впливають на відносини між громадами',
      ],
      '$xpath': 'safety_move/rel_factors',
      'relevant': '${community_rel}=\'_1_very_bad\' or ${community_rel}=\'_2_bad\'',
      'required': true,
      'constraint': 'not(selected(.,\'unable_unwilling_to_answer\') and count(.)>1)',
      'select_from_list_name': 'rel_factors',
      'constraint_message:en (en)': 'Cannot select together',
      'constraint_message:ua (ua)': 'Ці параметри не можна перевіряти разом',
    },
    {
      'name': 'community_incidents',
      'type': 'select_multiple',
      '$kuid': '51b6bbeb26',
      'label': [
        'Incidents experienced with other groups',
        'Інциденти з іншими групами',
      ],
      '$xpath': 'safety_move/community_incidents',
      'relevant': '${community_rel}=\'_1_very_bad\' or ${community_rel}=\'_2_bad\'',
      'required': true,
      'constraint': 'not(selected(.,\'no_incident_experienced\') and count(.)>1) and not(selected(.,\'unable_unwilling_to_answer\') and count(.)>1)',
      'select_from_list_name': 'community_incidents',
      'constraint_message:en (en)': 'Cannot select together',
      'constraint_message:ua (ua)': 'Ці параметри не можна перевіряти разом',
    },
    {
      'name': 'move_barriers',
      'type': 'select_multiple',
      '$kuid': 'c1ce30952c',
      'label': [
        'Barriers to movement in or around the area',
        'Перешкоди для пересування в цій місцевості',
      ],
      '$xpath': 'safety_move/move_barriers',
      'required': true,
      'constraint': 'not(selected(.,\'no\') and count(.)>1) and not(selected(.,\'unable_unwilling_to_answer\') and count(.)>1)',
      'select_from_list_name': 'move_barriers',
      'constraint_message:en (en)': 'Cannot select together',
      'constraint_message:ua (ua)': 'Ці параметри не можна перевіряти разом',
    },
    {
      'type': 'end_group',
      '$kuid': 'e482de3ead',
    },
    {
      'name': 'violence',
      'type': 'begin_group',
      '$kuid': 'dcf513c857',
      'label': [
        'Violence & Deprivation',
        'Насильство та позбавлення',
      ],
      '$xpath': 'violence',
      'required': false,
      'appearance': 'field-list w12',
    },
    {
      'name': 'violence_type',
      'type': 'select_multiple',
      '$kuid': '3b88a23e21',
      'label': [
        'What types of violence or abuse has the member experienced?',
        'Які види насильства або зловживань зазнав член домогосподарства?',
      ],
      '$xpath': 'violence/violence_type',
      'required': true,
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'violence_type',
      'constraint_message:en (en)': 'Cannot select None with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «Немає» разом з іншими',
    },
    {
      'name': 'discrimination_ground',
      'type': 'select_multiple',
      '$kuid': '5ef79b99f7',
      'label': [
        'On what grounds has the member experienced discrimination?',
        'За якою ознакою член домогосподарства зазнав дискримінації?',
      ],
      '$xpath': 'violence/discrimination_ground',
      'required': true,
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'discrimination_ground',
      'constraint_message:en (en)': 'Cannot select None with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «Немає» разом з іншими',
    },
    {
      'name': 'distress_signs',
      'type': 'select_multiple',
      '$kuid': 'cf49f875b6',
      'label': [
        'What signs of psychological distress are observed?',
        'Які ознаки психологічного стресу спостерігаються?',
      ],
      '$xpath': 'violence/distress_signs',
      'required': true,
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'distress_signs',
      'constraint_message:en (en)': 'Cannot select None with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «Немає» разом з іншими',
    },
    {
      'name': 'care_barriers',
      'type': 'select_multiple',
      '$kuid': 'ee9e1efdc3',
      'label': [
        'What barriers limit access to services?',
        'Які бар’єри обмежують доступ до послуг?',
      ],
      '$xpath': 'violence/care_barriers',
      'required': true,
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'care_barriers',
      'constraint_message:en (en)': 'Cannot select None with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «Немає» разом з іншими',
    },
    {
      'name': 'stress_factors',
      'type': 'select_multiple',
      '$kuid': 'c2d6072dce',
      'label': [
        'What factors currently cause stress?',
        'Які фактори наразі спричиняють стрес?',
      ],
      '$xpath': 'violence/stress_factors',
      'required': true,
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'stress_factors',
      'constraint_message:en (en)': 'Cannot select None with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «Немає» разом з іншими',
    },
    {
      'type': 'end_group',
      '$kuid': '7ceda4b83d',
    },
    {
      'name': 'coping',
      'type': 'begin_group',
      '$kuid': '9521eebc78',
      'label': [
        'Coping strategies',
        'Стратегії подолання',
      ],
      '$xpath': 'coping',
      'required': false,
      'appearance': 'field-list w12',
    },
    {
      'name': 'income_sources',
      'type': 'select_multiple',
      '$kuid': '9bcd0ef8a5',
      'label': [
        'Main household income sources',
        'Основні джерела доходу домогосподарства',
      ],
      '$xpath': 'coping/income_sources',
      'required': true,
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'income_sources',
      'constraint_message:en (en)': 'Cannot select None with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «Немає» разом з іншими',
    },
    {
      'name': 'social_support',
      'type': 'select_multiple',
      '$kuid': '8b0ab3ecfc',
      'label': [
        'Types of social protection received',
        'Отримувані види соціального захисту',
      ],
      '$xpath': 'coping/social_support',
      'relevant': 'selected(${income_sources}, \'social_protection_payments\')',
      'required': true,
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'social_support',
      'constraint_message:en (en)': 'Cannot select None with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «Немає» разом з іншими',
    },
    {
      'name': 'monthly_income',
      'type': 'select_one',
      '$kuid': 'b7272f589e',
      'label': [
        'Average monthly household income',
        'Середньомісячний дохід домогосподарства',
      ],
      '$xpath': 'coping/monthly_income',
      'required': true,
      'select_from_list_name': 'monthly_income',
    },
    {
      'name': 'unemployment_reasons',
      'type': 'select_multiple',
      '$kuid': 'cfe27b9b47',
      'label': [
        'Reasons household members are not working',
        'Причини безробіття в домогосподарстві',
      ],
      '$xpath': 'coping/unemployment_reasons',
      'required': true,
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'unemployment_reasons',
      'constraint_message:en (en)': 'Cannot select None with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «Немає» разом з іншими',
    },
    {
      'name': 'coping_strategies',
      'type': 'select_multiple',
      '$kuid': 'ea0d6a3c12',
      'label': [
        'Household coping strategies',
        'Стратегії подолання труднощів',
      ],
      '$xpath': 'coping/coping_strategies',
      'required': true,
      'appearance': 'minimal',
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'coping_strategies',
      'constraint_message:en (en)': 'Cannot select None with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «Немає» разом з іншими',
    },
    {
      'type': 'end_group',
      '$kuid': 'd32422944e',
    },
    {
      'name': 'education',
      'type': 'begin_group',
      '$kuid': 'ed995d3aa7',
      'label': [
        'Education access',
        'Доступ до освіти',
      ],
      '$xpath': 'education',
      'required': false,
      'appearance': 'field-list w12',
    },
    {
      'name': 'school_attendance_status',
      'type': 'select_multiple',
      '$kuid': 'dd8d91f618',
      'label': [
        'School attendance status of children',
        'Статус відвідування школи дітьми',
      ],
      '$xpath': 'education/school_attendance_status',
      'required': true,
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'school_attendance_status',
      'constraint_message:en (en)': 'Cannot select None with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «Немає» разом з іншими',
    },
    {
      'name': 'education_barriers',
      'type': 'select_multiple',
      '$kuid': '1ff955682e',
      'label': [
        'Barriers to education',
        'Бар’єри доступу до освіти',
      ],
      '$xpath': 'education/education_barriers',
      'relevant': 'selected(${school_attendance_status}, \'partial\') or selected(${school_attendance_status}, \'none\')',
      'required': true,
      'appearance': 'minimal',
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'education_barriers',
      'constraint_message:en (en)': 'Cannot select None with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «Немає» разом з іншими',
    },
    {
      'type': 'end_group',
      '$kuid': 'a954d6a57e',
    },
    {
      'name': 'housing',
      'type': 'begin_group',
      '$kuid': '0b8cb621ff',
      'label': [
        'Housing',
        'Житло',
      ],
      '$xpath': 'housing',
      'required': false,
      'appearance': 'field-list w12',
    },
    {
      'name': 'housing_type',
      'type': 'select_one',
      '$kuid': '83730e7aeb',
      'label': [
        'Current housing type',
        'Тип поточного житла',
      ],
      '$xpath': 'housing/housing_type',
      'required': true,
      'select_from_list_name': 'housing_type',
    },
    {
      'name': 'tenure_status',
      'type': 'select_one',
      '$kuid': 'e5110b3ce3',
      'label': [
        'Housing tenure status',
        'Статус користування житлом',
      ],
      '$xpath': 'housing/tenure_status',
      'required': true,
      'select_from_list_name': 'tenure_status',
    },
    {
      'name': 'housing_condition',
      'type': 'select_one',
      '$kuid': '3bc80d51d0',
      'label': [
        'Overall housing condition',
        'Загальний стан житла',
      ],
      '$xpath': 'housing/housing_condition',
      'required': true,
      'select_from_list_name': 'housing_condition',
    },
    {
      'name': 'housing_concerns',
      'type': 'select_multiple',
      '$kuid': '537dd265b1',
      'label': [
        'Main housing concerns',
        'Основні проблеми житла',
      ],
      '$xpath': 'housing/housing_concerns',
      'required': true,
      'constraint': 'not(selected(.,\'none\') and count(.)>1)',
      'select_from_list_name': 'housing_concerns',
      'constraint_message:en (en)': 'Cannot select None with other options',
      'constraint_message:ua (ua)': 'Не можна вибирати «Немає» разом з іншими',
    },
    {
      'type': 'end_group',
      '$kuid': '7590892f0b',
    },
  ],
  'choices': [
    {
      'name': 'ukrainian',
      '$kuid': 'aced346f92',
      'label': [
        'Ukrainian',
        'Українська',
      ],
      'list_name': 'citizenship',
    },
    {
      'name': 'stateless',
      '$kuid': 'c6247ca721',
      'label': [
        'Stateless',
        'Без громадянства',
      ],
      'list_name': 'citizenship',
    },
    {
      'name': 'non_ukrainian',
      '$kuid': '6d99f6128d',
      'label': [
        'Non-Ukrainian',
        'Неукраїнське громадянство',
      ],
      'list_name': 'citizenship',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'b30040677f',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'citizenship',
    },
    {
      'name': 'UA01',
      '$kuid': 'f396ff0371',
      'label': [
        'Autonomous Republic of Crimea',
        'Автономна Республіка Крим',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA71',
      '$kuid': '92b69ca8c8',
      'label': [
        'Cherkaska',
        'Черкаська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA74',
      '$kuid': '29aa493013',
      'label': [
        'Chernihivska',
        'Чернігівська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA73',
      '$kuid': '3348f62850',
      'label': [
        'Chernivetska',
        'Чернівецька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA12',
      '$kuid': 'd7835087fc',
      'label': [
        'Dnipropetrovska',
        'Дніпропетровська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA14',
      '$kuid': '7dbcfc795c',
      'label': [
        'Donetska',
        'Донецька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA26',
      '$kuid': '4c27ec69fa',
      'label': [
        'Ivano-Frankivska',
        'Івано-Франківська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA63',
      '$kuid': '527902cf7b',
      'label': [
        'Kharkivska',
        'Харківська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA65',
      '$kuid': 'e9d8454a72',
      'label': [
        'Khersonska',
        'Херсонська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA68',
      '$kuid': 'f01b17f85e',
      'label': [
        'Khmelnytska',
        'Хмельницька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA35',
      '$kuid': '3a0dc79d9c',
      'label': [
        'Kirovohradska',
        'Кіровоградська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA80',
      '$kuid': 'de41c9fbc3',
      'label': [
        'Kyiv',
        'Київ',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA32',
      '$kuid': '1609d74ade',
      'label': [
        'Kyivska',
        'Київська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA44',
      '$kuid': '2604062258',
      'label': [
        'Luhanska',
        'Луганська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA46',
      '$kuid': 'c36ea64e49',
      'label': [
        'Lvivska',
        'Львівська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA48',
      '$kuid': '5295eb2628',
      'label': [
        'Mykolaivska',
        'Миколаївська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA51',
      '$kuid': 'ff0708bcb4',
      'label': [
        'Odeska',
        'Одеська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA53',
      '$kuid': '4deffd9506',
      'label': [
        'Poltavska',
        'Полтавська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA56',
      '$kuid': '70fb6dcaa5',
      'label': [
        'Rivnenska',
        'Рівненська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA85',
      '$kuid': '99ade3f441',
      'label': [
        'Sevastopol',
        'Севастополь',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA59',
      '$kuid': '0e1e3ea51b',
      'label': [
        'Sumska',
        'Сумська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA61',
      '$kuid': '764518f424',
      'label': [
        'Ternopilska',
        'Тернопільська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA05',
      '$kuid': '32ca2c5c51',
      'label': [
        'Vinnytska',
        'Вінницька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA07',
      '$kuid': '1a1b47a4a1',
      'label': [
        'Volynska',
        'Волинська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA21',
      '$kuid': '2a4a2420ef',
      'label': [
        'Zakarpatska',
        'Закарпатська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA23',
      '$kuid': 'f3eb7a8d70',
      'label': [
        'Zaporizka',
        'Запорізька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA18',
      '$kuid': '869911617a',
      'label': [
        'Zhytomyrska',
        'Житомирська',
      ],
      'list_name': 'oblast',
    },
    {
      'tag': 'UA01',
      'name': 'UA0102',
      '$kuid': '35b42963cb',
      'label': [
        'Bakhchysaraiskyi',
        'Бахчисарайський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0104',
      '$kuid': '612f9cb96a',
      'label': [
        'Bilohirskyi',
        'Білогірський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0106',
      '$kuid': '31bda0f70f',
      'label': [
        'Dzhankoiskyi',
        'Джанкойський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0118',
      '$kuid': '88fdaa5608',
      'label': [
        'Feodosiiskyi',
        'Феодосійський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0110',
      '$kuid': '4faf7f6407',
      'label': [
        'Kerchynskyi',
        'Керченський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0112',
      '$kuid': '10dc8c593b',
      'label': [
        'Krasnohvardiiskyi',
        'Красногвардійський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0114',
      '$kuid': 'de4b9db030',
      'label': [
        'Krasnoperekopskyi',
        'Красноперекопський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0116',
      '$kuid': '2849797098',
      'label': [
        'Simferopolskyi',
        'Сімферопольський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0120',
      '$kuid': 'df80dcb656',
      'label': [
        'Yaltynskyi',
        'Ялтинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0108',
      '$kuid': 'c0404f5402',
      'label': [
        'Yevpatoriiskyi',
        'Євпаторійський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA71',
      'name': 'UA7108',
      '$kuid': '0e71813470',
      'label': [
        'Cherkaskyi',
        'Черкаський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA71',
      'name': 'UA7106',
      '$kuid': '899da96142',
      'label': [
        'Umanskyi',
        'Уманський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA71',
      'name': 'UA7104',
      '$kuid': '030900a914',
      'label': [
        'Zolotoniskyi',
        'Золотоніський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA71',
      'name': 'UA7102',
      '$kuid': 'f5a6eb36f4',
      'label': [
        'Zvenyhorodskyi',
        'Звенигородський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA74',
      'name': 'UA7410',
      '$kuid': '5e2f58a3a7',
      'label': [
        'Chernihivskyi',
        'Чернігівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA74',
      'name': 'UA7402',
      '$kuid': 'd960d00d25',
      'label': [
        'Koriukivskyi',
        'Корюківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA74',
      'name': 'UA7404',
      '$kuid': '69bcbeaed5',
      'label': [
        'Nizhynskyi',
        'Ніжинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA74',
      'name': 'UA7406',
      '$kuid': '4952274747',
      'label': [
        'Novhorod-Siverskyi',
        'Новгород-Сіверський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA74',
      'name': 'UA7408',
      '$kuid': '8bd1ad8e92',
      'label': [
        'Prylutskyi',
        'Прилуцький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA73',
      'name': 'UA7306',
      '$kuid': '65d26c42c2',
      'label': [
        'Chernivetskyi',
        'Чернівецький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA73',
      'name': 'UA7304',
      '$kuid': 'e3942cf76e',
      'label': [
        'Dnistrovskyi',
        'Дністровський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA73',
      'name': 'UA7302',
      '$kuid': '6d9905b613',
      'label': [
        'Vyzhnytskyi',
        'Вижницький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1202',
      '$kuid': 'a5c41ad41a',
      'label': [
        'Dniprovskyi',
        'Дніпровський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1204',
      '$kuid': '864b708860',
      'label': [
        'Kamianskyi',
        'Кам’янський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1206',
      '$kuid': '32cfa94e6a',
      'label': [
        'Kryvorizkyi',
        'Криворізький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1208',
      '$kuid': '64698bb78a',
      'label': [
        'Nikopolskyi',
        'Нікопольський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1210',
      '$kuid': 'c14b974253',
      'label': [
        'Novomoskovskyi',
        'Новомосковський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1212',
      '$kuid': 'c0869ca3d6',
      'label': [
        'Pavlohradskyi',
        'Павлоградський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1214',
      '$kuid': '1490fbbb2e',
      'label': [
        'Synelnykivskyi',
        'Синельниківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1402',
      '$kuid': '63a0a6303b',
      'label': [
        'Bakhmutskyi',
        'Бахмутський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1408',
      '$kuid': '6b166ad43d',
      'label': [
        'Donetskyi',
        'Донецький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1406',
      '$kuid': '92c146a6d8',
      'label': [
        'Horlivskyi',
        'Горлівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1410',
      '$kuid': '5fd664d8bd',
      'label': [
        'Kalmiuskyi',
        'Кальміуський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1412',
      '$kuid': 'e4b0eb7dd5',
      'label': [
        'Kramatorskyi',
        'Краматорський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1414',
      '$kuid': '2750c7e2fb',
      'label': [
        'Mariupolskyi',
        'Маріупольський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1416',
      '$kuid': '49b9e659ef',
      'label': [
        'Pokrovskyi',
        'Покровський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1404',
      '$kuid': 'cb5f1dd32a',
      'label': [
        'Volnovaskyi',
        'Волноваський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA26',
      'name': 'UA2604',
      '$kuid': 'ce357922ac',
      'label': [
        'Ivano-Frankivskyi',
        'Івано-Франківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA26',
      'name': 'UA2606',
      '$kuid': 'ff2906500a',
      'label': [
        'Kaluskyi',
        'Калуський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA26',
      'name': 'UA2608',
      '$kuid': 'c12430eac4',
      'label': [
        'Kolomyiskyi',
        'Коломийський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA26',
      'name': 'UA2610',
      '$kuid': '10e2ee6612',
      'label': [
        'Kosivskyi',
        'Косівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA26',
      'name': 'UA2612',
      '$kuid': 'ccc6ba2da7',
      'label': [
        'Nadvirnianskyi',
        'Надвірнянський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA26',
      'name': 'UA2602',
      '$kuid': '22147dce4e',
      'label': [
        'Verkhovynskyi',
        'Верховинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6302',
      '$kuid': 'f83439c733',
      'label': [
        'Bohodukhivskyi',
        'Богодухівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6314',
      '$kuid': '03061dc781',
      'label': [
        'Chuhuivskyi',
        'Чугуївський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6304',
      '$kuid': '091c3301cb',
      'label': [
        'Iziumskyi',
        'Ізюмський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6312',
      '$kuid': '3a28f6718f',
      'label': [
        'Kharkivskyi',
        'Харківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6306',
      '$kuid': '43643314e7',
      'label': [
        'Krasnohradskyi',
        'Красноградський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6308',
      '$kuid': 'e2b636bf12',
      'label': [
        'Kupianskyi',
        'Куп\'янський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6310',
      '$kuid': '0856f0e525',
      'label': [
        'Lozivskyi',
        'Лозівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA65',
      'name': 'UA6502',
      '$kuid': '15c60f7a61',
      'label': [
        'Beryslavskyi',
        'Бериславський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA65',
      'name': 'UA6504',
      '$kuid': '167ea9bfa2',
      'label': [
        'Henicheskyi',
        'Генічеський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA65',
      'name': 'UA6506',
      '$kuid': '975ce40631',
      'label': [
        'Kakhovskyi',
        'Каховський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA65',
      'name': 'UA6510',
      '$kuid': '0a5cf7d7ac',
      'label': [
        'Khersonskyi',
        'Херсонський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA65',
      'name': 'UA6508',
      '$kuid': '45142414da',
      'label': [
        'Skadovskyi',
        'Скадовський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA68',
      'name': 'UA6802',
      '$kuid': '635dc1aaf9',
      'label': [
        'Kamianets-Podilskyi',
        'Кам\'янець-Подільський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA68',
      'name': 'UA6804',
      '$kuid': 'ed2ebac12c',
      'label': [
        'Khmelnytskyi',
        'Хмельницький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA68',
      'name': 'UA6806',
      '$kuid': 'e49edd336f',
      'label': [
        'Shepetivskyi',
        'Шепетівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA35',
      'name': 'UA3502',
      '$kuid': '85092904a2',
      'label': [
        'Holovanivskyi',
        'Голованівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA35',
      'name': 'UA3504',
      '$kuid': '79853225c2',
      'label': [
        'Kropyvnytskyi',
        'Кропивницький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA35',
      'name': 'UA3506',
      '$kuid': '2057d549dc',
      'label': [
        'Novoukrainskyi',
        'Новоукраїнський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA35',
      'name': 'UA3508',
      '$kuid': 'a1f33f7c1e',
      'label': [
        'Oleksandriiskyi',
        'Олександрійський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA80',
      'name': 'UA8000',
      '$kuid': 'fb639887e3',
      'label': [
        'Kyiv',
        'Київ',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3202',
      '$kuid': 'ca5c1f89fd',
      'label': [
        'Bilotserkivskyi',
        'Білоцерківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3204',
      '$kuid': 'd43d9fb907',
      'label': [
        'Boryspilskyi',
        'Бориспільський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3206',
      '$kuid': 'e7e4c21ebf',
      'label': [
        'Brovarskyi',
        'Броварський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3208',
      '$kuid': '74eb731791',
      'label': [
        'Buchanskyi',
        'Бучанський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3200',
      '$kuid': '95d2b8a167',
      'label': [
        'Chornobyl Exclusion Zone',
        'Чорнобильська зона відчуження',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3214',
      '$kuid': '54e5e8b232',
      'label': [
        'Fastivskyi',
        'Фастівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3212',
      '$kuid': '318c361ef6',
      'label': [
        'Obukhivskyi',
        'Обухівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3210',
      '$kuid': '0a62df8efe',
      'label': [
        'Vyshhorodskyi',
        'Вишгородський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4402',
      '$kuid': 'f7ff689d8f',
      'label': [
        'Alchevskyi',
        'Алчевський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4404',
      '$kuid': '100bec643c',
      'label': [
        'Dovzhanskyi',
        'Довжанський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4406',
      '$kuid': '0b1db28749',
      'label': [
        'Luhanskyi',
        'Луганський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4408',
      '$kuid': '3e1fcd0b66',
      'label': [
        'Rovenkivskyi',
        'Ровеньківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4416',
      '$kuid': '0620562e74',
      'label': [
        'Shchastynskyi',
        'Щастинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4412',
      '$kuid': '07b6480a92',
      'label': [
        'Sievierodonetskyi',
        'Сєвєродонецький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4414',
      '$kuid': 'b96211fea3',
      'label': [
        'Starobilskyi',
        'Старобільський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4410',
      '$kuid': '37e2cd7cb6',
      'label': [
        'Svativskyi',
        'Сватівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4612',
      '$kuid': '93f3ee5691',
      'label': [
        'Chervonohradskyi',
        'Червоноградський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4602',
      '$kuid': '6263d6a12e',
      'label': [
        'Drohobytskyi',
        'Дрогобицький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4606',
      '$kuid': '5e1ec1c5a1',
      'label': [
        'Lvivskyi',
        'Львівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4608',
      '$kuid': '1bc55afafe',
      'label': [
        'Sambirskyi',
        'Самбірський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4610',
      '$kuid': '1f18477eac',
      'label': [
        'Stryiskyi',
        'Стрийський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4614',
      '$kuid': '95847179c6',
      'label': [
        'Yavorivskyi',
        'Яворівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4604',
      '$kuid': 'c00f073a7c',
      'label': [
        'Zolochivskyi',
        'Золочівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA48',
      'name': 'UA4802',
      '$kuid': 'bd26777c24',
      'label': [
        'Bashtanskyi',
        'Баштанський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA48',
      'name': 'UA4806',
      '$kuid': 'd3ebf47ee5',
      'label': [
        'Mykolaivskyi',
        'Миколаївський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA48',
      'name': 'UA4808',
      '$kuid': 'a543d578be',
      'label': [
        'Pervomaiskyi',
        'Первомайський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA48',
      'name': 'UA4804',
      '$kuid': 'e05aba6e2a',
      'label': [
        'Voznesenskyi',
        'Вознесенський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5102',
      '$kuid': '0b501bc625',
      'label': [
        'Berezivskyi',
        'Березівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5104',
      '$kuid': '63df4797a7',
      'label': [
        'Bilhorod-Dnistrovskyi',
        'Білгород-Дністровський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5106',
      '$kuid': '06b9cdf4a6',
      'label': [
        'Bolhradskyi',
        'Болградський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5108',
      '$kuid': '764f7cc5a1',
      'label': [
        'Izmailskyi',
        'Ізмаїльський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5110',
      '$kuid': '103c411049',
      'label': [
        'Odeskyi',
        'Одеський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5112',
      '$kuid': '08392fc52d',
      'label': [
        'Podilskyi',
        'Подільський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5114',
      '$kuid': '20f106d081',
      'label': [
        'Rozdilnianskyi',
        'Роздільнянський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA53',
      'name': 'UA5302',
      '$kuid': '192cbe87a3',
      'label': [
        'Kremenchutskyi',
        'Кременчуцький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA53',
      'name': 'UA5304',
      '$kuid': 'ef8632a6f4',
      'label': [
        'Lubenskyi',
        'Лубенський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA53',
      'name': 'UA5306',
      '$kuid': '08ab914f4e',
      'label': [
        'Myrhorodskyi',
        'Миргородський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA53',
      'name': 'UA5308',
      '$kuid': 'aac91f577e',
      'label': [
        'Poltavskyi',
        'Полтавський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA56',
      'name': 'UA5604',
      '$kuid': '98ff108632',
      'label': [
        'Dubenskyi',
        'Дубенський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA56',
      'name': 'UA5606',
      '$kuid': '170b96b2ae',
      'label': [
        'Rivnenskyi',
        'Рівненський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA56',
      'name': 'UA5608',
      '$kuid': '53c4cdd54f',
      'label': [
        'Sarnenskyi',
        'Сарненський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA56',
      'name': 'UA5602',
      '$kuid': '13a2aa3605',
      'label': [
        'Varaskyi',
        'Вараський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA85',
      'name': 'UA8500',
      '$kuid': 'dfad30d371',
      'label': [
        'Sevastopol',
        'Севастополь',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA59',
      'name': 'UA5902',
      '$kuid': 'ff37e427fb',
      'label': [
        'Konotopskyi',
        'Конотопський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA59',
      'name': 'UA5904',
      '$kuid': '6eb3e86b02',
      'label': [
        'Okhtyrskyi',
        'Охтирський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA59',
      'name': 'UA5906',
      '$kuid': 'b059ff04c3',
      'label': [
        'Romenskyi',
        'Роменський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA59',
      'name': 'UA5910',
      '$kuid': '3f2c685754',
      'label': [
        'Shostkynskyi',
        'Шосткинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA59',
      'name': 'UA5908',
      '$kuid': 'dd9b98a268',
      'label': [
        'Sumskyi',
        'Сумський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA61',
      'name': 'UA6106',
      '$kuid': '8005cec43f',
      'label': [
        'Chortkivskyi',
        'Чортківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA61',
      'name': 'UA6102',
      '$kuid': '968d3167ca',
      'label': [
        'Kremenetskyi',
        'Кременецький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA61',
      'name': 'UA6104',
      '$kuid': '8b7fa3810d',
      'label': [
        'Ternopilskyi',
        'Тернопільський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA05',
      'name': 'UA0504',
      '$kuid': '94ff4630d1',
      'label': [
        'Haisynskyi',
        'Гайсинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA05',
      'name': 'UA0512',
      '$kuid': 'fcabd6fee1',
      'label': [
        'Khmilnytskyi',
        'Хмільницький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA05',
      'name': 'UA0508',
      '$kuid': '768fb921c2',
      'label': [
        'Mohyliv-Podilskyi',
        'Могилів-Подільський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA05',
      'name': 'UA0510',
      '$kuid': 'f79aa201fb',
      'label': [
        'Tulchynskyi',
        'Тульчинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA05',
      'name': 'UA0502',
      '$kuid': 'dce324fb9d',
      'label': [
        'Vinnytskyi',
        'Вінницький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA05',
      'name': 'UA0506',
      '$kuid': 'c655d38057',
      'label': [
        'Zhmerynskyi',
        'Жмеринський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA07',
      'name': 'UA0704',
      '$kuid': 'd3f684bf62',
      'label': [
        'Kamin-Kashyrskyi',
        'Камінь-Каширський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA07',
      'name': 'UA0706',
      '$kuid': 'c91eb025cb',
      'label': [
        'Kovelskyi',
        'Ковельський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA07',
      'name': 'UA0708',
      '$kuid': 'eddb06ca66',
      'label': [
        'Lutskyi',
        'Луцький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA07',
      'name': 'UA0702',
      '$kuid': 'd6c8a3f14e',
      'label': [
        'Volodymyrskyi',
        'Володимирський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA21',
      'name': 'UA2102',
      '$kuid': '14113a08ba',
      'label': [
        'Berehivskyi',
        'Берегівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA21',
      'name': 'UA2112',
      '$kuid': 'ad00c31c55',
      'label': [
        'Khustskyi',
        'Хустський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA21',
      'name': 'UA2104',
      '$kuid': '56282a7795',
      'label': [
        'Mukachivskyi',
        'Мукачівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA21',
      'name': 'UA2106',
      '$kuid': 'ca7844d511',
      'label': [
        'Rakhivskyi',
        'Рахівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA21',
      'name': 'UA2108',
      '$kuid': 'ce111a5c70',
      'label': [
        'Tiachivskyi',
        'Тячівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA21',
      'name': 'UA2110',
      '$kuid': 'f8d39842a6',
      'label': [
        'Uzhhorodskyi',
        'Ужгородський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA23',
      'name': 'UA2302',
      '$kuid': '228c9df8a0',
      'label': [
        'Berdianskyi',
        'Бердянський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA23',
      'name': 'UA2308',
      '$kuid': 'b8dc66c2fc',
      'label': [
        'Melitopolskyi',
        'Мелітопольський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA23',
      'name': 'UA2310',
      '$kuid': '47ddc57166',
      'label': [
        'Polohivskyi',
        'Пологівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA23',
      'name': 'UA2304',
      '$kuid': '29f77b49fc',
      'label': [
        'Vasylivskyi',
        'Василівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA23',
      'name': 'UA2306',
      '$kuid': 'f22ec9c66a',
      'label': [
        'Zaporizkyi',
        'Запорізький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA18',
      'name': 'UA1802',
      '$kuid': 'a9efc305b5',
      'label': [
        'Berdychivskyi',
        'Бердичівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA18',
      'name': 'UA1806',
      '$kuid': '251ff7b46e',
      'label': [
        'Korostenskyi',
        'Коростенський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA18',
      'name': 'UA1804',
      '$kuid': '99884f8e59',
      'label': [
        'Zhytomyrskyi',
        'Житомирський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA18',
      'name': 'UA1808',
      '$kuid': '8985517ba6',
      'label': [
        'Zviahelskyi',
        'Звягельський',
      ],
      'list_name': 'raion',
    },
    {
      'name': 'russian_masculine',
      '$kuid': '54ebc7a635',
      'label': [
        'Russian',
        'Російський',
      ],
      'list_name': 'citizen_foreign',
    },
    {
      'name': 'country_of_origin_azerbaijan',
      '$kuid': '10b03222ea',
      'label': [
        'Azerbaijani',
        'Азербайджан',
      ],
      'list_name': 'citizen_foreign',
    },
    {
      'name': 'country_of_origin_moldovan',
      '$kuid': '06761e4414',
      'label': [
        'Moldovan',
        'Молдова',
      ],
      'list_name': 'citizen_foreign',
    },
    {
      'name': 'country_of_origin_romanian',
      '$kuid': 'c0e155e1b3',
      'label': [
        'Romanian',
        'Румунія',
      ],
      'list_name': 'citizen_foreign',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '194f22503b',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'citizen_foreign',
    },
    {
      'name': 'other_specify',
      '$kuid': '71f700cd48',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'citizen_foreign',
    },
    {
      'name': 'one_person_household',
      '$kuid': 'fe3436ef64',
      'label': [
        'One person household (any person living alone)',
        'Домогосподарство з однією особою (будь-яка самотня особа)',
      ],
      'list_name': 'household_type',
    },
    {
      'name': 'couple_without_children',
      '$kuid': 'aa497b24c4',
      'label': [
        'Couple without children (2 members)',
        'Пара без дітей (2 члени)',
      ],
      'list_name': 'household_type',
    },
    {
      'name': 'couple_with_children',
      '$kuid': '06b6ebfb5c',
      'label': [
        'Couple with children (3+ members)',
        'Пара з дітьми (3+ члени)',
      ],
      'list_name': 'household_type',
    },
    {
      'name': 'mother_with_children',
      '$kuid': 'ef16ca2d3f',
      'label': [
        'Mother with children (2+ members)',
        'Мати з дітьми (2+ члени)',
      ],
      'list_name': 'household_type',
    },
    {
      'name': 'father_with_children',
      '$kuid': '2ed06d7e9d',
      'label': [
        'Father with children (2+ members)',
        'Батько з дітьми (2+ члени)',
      ],
      'list_name': 'household_type',
    },
    {
      'name': 'extended_family',
      '$kuid': 'edd1331c9d',
      'label': [
        'Extended family (2+ members – may contain partners, children and any other familial relative but must not include any extra-familial members)',
        'Розширена сім \'я (2+ члени – може містити партнерів, дітей та будь-яких інших сімейних родичів, але не має включати будь-яких позасімейних членів)',
      ],
      'list_name': 'household_type',
    },
    {
      'name': 'male',
      '$kuid': 'ccaed57369',
      'label': [
        'Male',
        'Чоловік',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'female',
      '$kuid': 'd8753c675b',
      'label': [
        'Female',
        'Жінка',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'other',
      '$kuid': '8e3d25019b',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '7f047d6770',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'no',
      '$kuid': 'f04c3e21a0',
      'label': [
        'No',
        'Hi',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_see',
      '$kuid': '3fb5b11a95',
      'label': [
        'Seeing, even if wearing glasses',
        'Зір, навіть якщо в окулярах',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_hear',
      '$kuid': '498fb2c57e',
      'label': [
        'Hearing, even if using a hearing aid',
        'Слух, навіть якщо зі слуховим апаратом',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_walk',
      '$kuid': '926a05c282',
      'label': [
        'Walking or climbing steps',
        'Ходьба або сходження по сходах',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_rem',
      '$kuid': '66f1d5a624',
      'label': [
        'Remembering or concentrating',
        'Пам\'ять або концентрація',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_care',
      '$kuid': '1df4950dc6',
      'label': [
        'Self-care, such as washing all over or dressing',
        'Догляд за собою, наприклад миття тіла або одягання',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_comm',
      '$kuid': '9643d9cd1a',
      'label': [
        'Using your usual (customary) language, have difficulty communicating, for example understanding or being understood?',
        'Використання звичної (звичайної) мови, виникають труднощі у спілкуванні, наприклад, з розумінням або з можливістю бути зрозумілим?',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_none',
      '$kuid': '7474d003d0',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'name',
      '$kuid': '6e06dd510b',
      'label': [
        'label::en',
        'label::uk',
      ],
      'list_name': 'list_name',
    },
    {
      'name': 'yes',
      '$kuid': '8d82b33b3d',
      'label': [
        'Yes',
        'Так',
      ],
      'list_name': 'yn',
    },
    {
      'name': 'no',
      '$kuid': 'ee10a7d051',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'yn',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '99f1988a3b',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'yn',
    },
    {
      'name': 'partner',
      '$kuid': 'e0fc33472d',
      'label': [
        'Partner',
        'Партнер',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'child_lt_18',
      '$kuid': 'a5cc771a83',
      'label': [
        'Child (<18)',
        'Дитина (<18)',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'child_gte_18',
      '$kuid': 'df87f5acd6',
      'label': [
        'Child (≥18)',
        'Дитина (≥18)',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'mother',
      '$kuid': 'cc6fb1582c',
      'label': [
        'Mother',
        'Мати',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'father',
      '$kuid': 'e12b3d161c',
      'label': [
        'Father',
        'Батько',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'caregiver',
      '$kuid': 'e9c4b3a374',
      'label': [
        'Caregiver',
        'Опікун',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'other',
      '$kuid': '438229e5ca',
      'label': [
        'Other relative',
        'Інший родич',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'with_respondent',
      '$kuid': '30e9b869aa',
      'label': [
        'With respondent',
        'З респондентом',
      ],
      'list_name': 'location',
    },
    {
      'name': 'area_of_origin',
      '$kuid': '61ffa6a047',
      'label': [
        'Area of origin',
        'Район походження',
      ],
      'list_name': 'location',
    },
    {
      'name': 'elsewhere_country',
      '$kuid': '870ccd075d',
      'label': [
        'Elsewhere in the',
        'В іншому місці країни',
      ],
      'list_name': 'location',
    },
    {
      'name': 'abroad',
      '$kuid': 'c23ffae7da',
      'label': [
        'Abroad',
        'За кордоном',
      ],
      'list_name': 'location',
    },
    {
      'name': 'unknown',
      '$kuid': '4034c667d9',
      'label': [
        'Unknown',
        'Невідомо',
      ],
      'list_name': 'location',
    },
    {
      'name': 'other',
      '$kuid': '21bdd28d76',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'location',
    },
    {
      'name': 'security',
      '$kuid': '7fa7d60d1a',
      'label': [
        'Security situation',
        'Безпекова ситуація',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'health',
      '$kuid': '7d185b522e',
      'label': [
        'Health reasons',
        'Причини здоров’я',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'work',
      '$kuid': '8c89abfeb1',
      'label': [
        'Work or livelihood',
        'Робота / засоби існування',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'caregiving',
      '$kuid': '6d27acd5af',
      'label': [
        'Caring for others',
        'Догляд за іншими',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'documentation',
      '$kuid': 'a4589e3937',
      'label': [
        'Lack of documents',
        'Відсутність документів',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'travel_restrictions',
      '$kuid': '2fa4136807',
      'label': [
        'Movement / travel restrictions',
        'Обмеження пересування',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'other',
      '$kuid': 'a365c3a475',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'idp',
      '$kuid': 'ee2d2b9dd3',
      'label': [
        'Internally Displaced Person (IDP)',
        'Внутрішньо переміщена особа',
      ],
      'list_name': 'disp_status',
    },
    {
      'tag': 'що повернулася',
      'name': 'returnee',
      '$kuid': 'a3769933ce',
      'label': [
        'Returnee',
        'Особа',
      ],
      'list_name': 'disp_status',
    },
    {
      'name': 'non_displaced',
      '$kuid': '321b768c97',
      'label': [
        'Non-displaced',
        'Не переміщувався',
      ],
      'list_name': 'disp_status',
    },
    {
      'name': 'recent',
      '$kuid': '7e810e356e',
      'label': [
        'Recently returned',
        'Нещодавно повернувся',
      ],
      'list_name': 'returnee_type',
    },
    {
      'name': 'long_term',
      '$kuid': 'e2653d47b6',
      'label': [
        'Returned long ago',
        'Повернувся давно',
      ],
      'list_name': 'returnee_type',
    },
    {
      'name': 'insecurity',
      '$kuid': '19578feed9',
      'label': [
        'Insecurity / conflict',
        'Небезпека / конфлікт',
      ],
      'list_name': 'leave_reason',
    },
    {
      'name': 'housing_damage',
      '$kuid': '7776f09652',
      'label': [
        'Housing damaged or destroyed',
        'Житло пошкоджене або зруйноване',
      ],
      'list_name': 'leave_reason',
    },
    {
      'name': 'lack_services',
      '$kuid': '615dde2900',
      'label': [
        'Lack of basic services',
        'Відсутність базових послуг',
      ],
      'list_name': 'leave_reason',
    },
    {
      'name': 'livelihoods',
      '$kuid': '6bc3368c87',
      'label': [
        'Lack of livelihoods',
        'Відсутність засобів до існування',
      ],
      'list_name': 'leave_reason',
    },
    {
      'name': 'family',
      '$kuid': '07486bc04e',
      'label': [
        'Family reunification',
        'Возз’єднання з родиною',
      ],
      'list_name': 'leave_reason',
    },
    {
      'name': 'other',
      '$kuid': 'fdf9882629',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'leave_reason',
    },
    {
      'name': 'own_vehicle',
      '$kuid': '3b46322cb3',
      'label': [
        'Own vehicle',
        'Власний транспорт',
      ],
      'list_name': 'travel_mode',
    },
    {
      'name': 'public_transport',
      '$kuid': '8d209595a6',
      'label': [
        'Public transport',
        'Громадський транспорт',
      ],
      'list_name': 'travel_mode',
    },
    {
      'name': 'humanitarian_transport',
      '$kuid': '78c5c0ac0d',
      'label': [
        'Humanitarian transport',
        'Гуманітарний транспорт',
      ],
      'list_name': 'travel_mode',
    },
    {
      'name': 'walking',
      '$kuid': '9634d276b6',
      'label': [
        'On foot',
        'Пішки',
      ],
      'list_name': 'travel_mode',
    },
    {
      'name': 'other',
      '$kuid': '0b4e205491',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'travel_mode',
    },
    {
      'name': 'improved_security',
      '$kuid': 'ad5d97b918',
      'label': [
        'Improved security',
        'Покращення безпеки',
      ],
      'list_name': 'return_reason',
    },
    {
      'name': 'housing_repaired',
      '$kuid': '2927450b88',
      'label': [
        'Housing repaired or compensated',
        'Житло відремонтоване або компенсоване',
      ],
      'list_name': 'return_reason',
    },
    {
      'name': 'services_restored',
      '$kuid': 'fdb687be2d',
      'label': [
        'Services restored',
        'Відновлення послуг',
      ],
      'list_name': 'return_reason',
    },
    {
      'name': 'livelihoods',
      '$kuid': '9e3c2d413f',
      'label': [
        'Livelihood opportunities',
        'Можливості заробітку',
      ],
      'list_name': 'return_reason',
    },
    {
      'name': 'family',
      '$kuid': '0d831a4979',
      'label': [
        'Family reasons',
        'Сімейні причини',
      ],
      'list_name': 'return_reason',
    },
    {
      'name': 'other',
      '$kuid': '7c33e88f0b',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'return_reason',
    },
    {
      'name': 'yes',
      '$kuid': 'd4b2dfbdb9',
      'label': [
        'Yes',
        'Так',
      ],
      'list_name': 'compensation',
    },
    {
      'name': 'no',
      '$kuid': '16edb8792b',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'compensation',
    },
    {
      'name': 'unknown',
      '$kuid': '3a9ca88fa5',
      'label': [
        'Do not know / prefer not to say',
        'Важко сказати / не бажаю відповідати',
      ],
      'list_name': 'compensation',
    },
    {
      'name': 'stay',
      '$kuid': '17a502c8d7',
      'label': [
        'Stay in current location',
        'Залишитися на поточному місці',
      ],
      'list_name': 'intentions',
    },
    {
      'name': 'integrate',
      '$kuid': 'fc39f3ce75',
      'label': [
        'Integrate locally',
        'Інтегруватися локально',
      ],
      'list_name': 'intentions',
    },
    {
      'name': 'return_origin',
      '$kuid': '4ce0fbecbb',
      'label': [
        'Return to place of origin',
        'Повернутися до місця походження',
      ],
      'list_name': 'intentions',
    },
    {
      'name': 'relocate_ukraine',
      '$kuid': '1828e4bb08',
      'label': [
        'Relocate elsewhere in Ukraine',
        'Переїхати в інший регіон України',
      ],
      'list_name': 'intentions',
    },
    {
      'name': 'relocate_abroad',
      '$kuid': '94ce20dc5c',
      'label': [
        'Relocate outside Ukraine',
        'Переїхати за межі України',
      ],
      'list_name': 'intentions',
    },
    {
      'name': 'housing',
      '$kuid': '7586f2320e',
      'label': [
        'Housing support',
        'Підтримка з житлом',
      ],
      'list_name': 'integrate_needs',
    },
    {
      'name': 'jobs',
      '$kuid': '7534175fa8',
      'label': [
        'Employment opportunities',
        'Можливості працевлаштування',
      ],
      'list_name': 'integrate_needs',
    },
    {
      'name': 'services',
      '$kuid': '7c14cf8421',
      'label': [
        'Access to services',
        'Доступ до послуг',
      ],
      'list_name': 'integrate_needs',
    },
    {
      'name': 'social',
      '$kuid': '798a3a419b',
      'label': [
        'Social integration',
        'Соціальна інтеграція',
      ],
      'list_name': 'integrate_needs',
    },
    {
      'name': 'legal',
      '$kuid': 'fb7af67da6',
      'label': [
        'Legal assistance',
        'Юридична допомога',
      ],
      'list_name': 'integrate_needs',
    },
    {
      'name': 'other',
      '$kuid': 'dbb22594ea',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'integrate_needs',
    },
    {
      'name': 'security',
      '$kuid': '54012da5e6',
      'label': [
        'Improved security situation',
        'Покращення безпеки',
      ],
      'list_name': 'return_conditions',
    },
    {
      'name': 'housing',
      '$kuid': '4e3467f454',
      'label': [
        'Repaired housing',
        'Відновлене житло',
      ],
      'list_name': 'return_conditions',
    },
    {
      'name': 'services',
      '$kuid': '1dea46a6cc',
      'label': [
        'Restored services',
        'Відновлення послуг',
      ],
      'list_name': 'return_conditions',
    },
    {
      'name': 'livelihoods',
      '$kuid': '8045ec37b4',
      'label': [
        'Access to livelihoods',
        'Доступ до засобів до існування',
      ],
      'list_name': 'return_conditions',
    },
    {
      'name': 'insecurity',
      '$kuid': 'd1ab9a7f32',
      'label': [
        'Insecurity',
        'Небезпека',
      ],
      'list_name': 'relocate_reason',
    },
    {
      'name': 'housing',
      '$kuid': '96daff3e53',
      'label': [
        'Housing issues',
        'Проблеми з житлом',
      ],
      'list_name': 'relocate_reason',
    },
    {
      'name': 'services',
      '$kuid': '5e0ac99c99',
      'label': [
        'Lack of services',
        'Відсутність послуг',
      ],
      'list_name': 'relocate_reason',
    },
    {
      'name': 'livelihoods',
      '$kuid': 'f9472e01a1',
      'label': [
        'Lack of livelihoods',
        'Відсутність роботи',
      ],
      'list_name': 'relocate_reason',
    },
    {
      'name': 'family',
      '$kuid': '0495c69b79',
      'label': [
        'Family reasons',
        'Сімейні причини',
      ],
      'list_name': 'relocate_reason',
    },
    {
      'name': 'other',
      '$kuid': '3ecb1da55b',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'relocate_reason',
    },
    {
      'name': 'yes_refugee_status',
      '$kuid': 'cc852cf3f3',
      'label': [
        'Refugee or protection status',
        'Статус біженця або захисту',
      ],
      'list_name': 'non_ua_docs',
    },
    {
      'name': 'yes_asylum_request_registrated',
      '$kuid': '74299d2f1c',
      'label': [
        'Asylum request registered',
        'Зареєстрований запит на притулок',
      ],
      'list_name': 'non_ua_docs',
    },
    {
      'name': 'yes_residence_permit',
      '$kuid': '4f149e0b8c',
      'label': [
        'Residence permit',
        'Посвідка на проживання',
      ],
      'list_name': 'non_ua_docs',
    },
    {
      'name': 'no',
      '$kuid': 'd41db134e2',
      'label': [
        'No documentation',
        'Немає документів',
      ],
      'list_name': 'non_ua_docs',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '487a109bf5',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'non_ua_docs',
    },
    {
      'name': 'yes',
      '$kuid': '22e3b19f3b',
      'label': [
        'Yes',
        'Так',
      ],
      'list_name': 'stateless_cert',
    },
    {
      'name': 'no',
      '$kuid': 'd324fd01fd',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'stateless_cert',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '44ea0f870f',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'stateless_cert',
    },
    {
      'tag': 'Так',
      'name': 'yes_all',
      'tag1': 'усі члени домогосподарства',
      '$kuid': '91a0ef3123',
      'label': [
        'Yes',
        'all household members',
      ],
      'list_name': 'idp_registered',
    },
    {
      'tag': 'Ні',
      'name': 'no_some',
      'tag1': 'деякі не зареєстровані',
      '$kuid': '25fc228819',
      'label': [
        'No',
        'some members not registered',
      ],
      'list_name': 'idp_registered',
    },
    {
      'name': 'none',
      '$kuid': '2e8434b557',
      'label': [
        'None registered',
        'Ніхто не зареєстрований',
      ],
      'list_name': 'idp_registered',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '7c7061b8ff',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'idp_registered',
    },
    {
      'name': 'yes',
      '$kuid': '55af26b73c',
      'label': [
        'Yes',
        'Так',
      ],
      'list_name': 'member_registered',
    },
    {
      'name': 'no',
      '$kuid': '6e33aaa340',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'member_registered',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'd99d81c746',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'member_registered',
    },
    {
      'name': 'birth_certificate',
      '$kuid': 'a76aed3979',
      'label': [
        'Birth certificate',
        'Свідоцтво про народження',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'tin',
      '$kuid': '0bbf548b10',
      'label': [
        'TIN – tax identification number',
        'ІПН – податковий номер',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'pensioner_cert_social',
      '$kuid': 'b06e673dc8',
      'label': [
        'Pensioner certificate (social)',
        'Пенсійне посвідчення (соціальне)',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'pensioner_cert_retirement',
      '$kuid': '6a498858e9',
      'label': [
        'Pensioner certificate (retirement)',
        'Пенсійне посвідчення (пенсійне)',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'passport',
      '$kuid': 'fef2082d04',
      'label': [
        'National passport',
        'Національний паспорт',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'none',
      '$kuid': 'adcce1d88c',
      'label': [
        'None',
        'Жодного',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '99dbc6b60a',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'other_specify',
      '$kuid': 'de8109d49d',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'idp_certificate',
      '$kuid': 'ddec6f9e26',
      'label': [
        'IDP certificate (paper-based)',
        'Довідка ВПО (у паперовому вигляді)',
      ],
      'list_name': 'idp_docs',
    },
    {
      'name': 'idp_eregistration',
      '$kuid': 'ac75866598',
      'label': [
        'IDP e-registration',
        'Електронна реєстрація ВПО',
      ],
      'list_name': 'idp_docs',
    },
    {
      'name': 'no_proof_of_registration',
      '$kuid': 'f6ed5263d2',
      'label': [
        'No proof of registration',
        'Немає підтвердження реєстрації',
      ],
      'list_name': 'idp_docs',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '3a32822903',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'idp_docs',
    },
    {
      'name': 'yes',
      '$kuid': '3e853847c5',
      'label': [
        'Yes',
        'Так',
      ],
      'list_name': 'idp_allowance',
    },
    {
      'name': 'no',
      '$kuid': '1606dc23f8',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'idp_allowance',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '8beee2ae97',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'idp_allowance',
    },
    {
      'name': 'delays_in_allowances_payment',
      '$kuid': '322dcf20fc',
      'label': [
        'Delays in allowance payment',
        'Затримки виплати допомоги',
      ],
      'list_name': 'no_allowance_reason',
    },
    {
      'name': 'change_of_place_of_residence',
      '$kuid': '2dfece285b',
      'label': [
        'Change of place of residence',
        'Зміна місця проживання',
      ],
      'list_name': 'no_allowance_reason',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '13baa86da9',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'no_allowance_reason',
    },
    {
      'name': 'other_specify',
      '$kuid': 'd1923f1ea3',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'no_allowance_reason',
    },
    {
      'name': 'registration_was_rejected',
      '$kuid': '86c8bfc8fd',
      'label': [
        'Registration was rejected',
        'Реєстрацію відхилено',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'delays_in_registration_process',
      '$kuid': 'b9979999d7',
      'label': [
        'Delays in registration process',
        'Затримки в процесі реєстрації',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'unaware_of_registration_process',
      '$kuid': 'f2edb83d96',
      'label': [
        'Unaware of the registration process',
        'Не обізнаний з процесом реєстрації',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'unable_to_access_registration_center',
      '$kuid': '6aa7a07a6f',
      'label': [
        'Unable to access registration center',
        'Неможливо отримати доступ до центру реєстрації',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'costly_process',
      '$kuid': '6585bd4a68',
      'label': [
        'Costly process',
        'Витратний процес',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'not_entitled_to_register_as_an_idp',
      '$kuid': '66cd1545ec',
      'label': [
        'Not entitled to register as IDP',
        'Немає права реєструватися як ВПО',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'fear_of_conscription',
      '$kuid': '7ae393031e',
      'label': [
        'Fear of conscription',
        'Страх призову',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'lack_of_required_documentation',
      '$kuid': 'b8236d7f01',
      'label': [
        'Lack of required documentation',
        'Відсутність необхідних документів',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '5ed279fd7d',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'other_specify',
      '$kuid': '2162669f0a',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'multiple_displacements',
      '$kuid': '8f9de1f098',
      'label': [
        'Multiple displacements',
        'Багаторазові переміщення',
      ],
      'list_name': 'rejected_reason',
    },
    {
      'name': 'lack_of_personal_documentation',
      '$kuid': '58977e90ba',
      'label': [
        'Lack of personal documentation',
        'Відсутність особистих документів',
      ],
      'list_name': 'rejected_reason',
    },
    {
      'name': 'area_not_eligible',
      '$kuid': 'd16ce7e11e',
      'label': [
        'Area of displacement not eligible for IDP registration',
        'Територія переміщення не підпадає під критерії реєстрації ВПО',
      ],
      'list_name': 'rejected_reason',
    },
    {
      'name': 'area_too_close_to_origin',
      '$kuid': '41a438da0e',
      'label': [
        'Displacement area too close to place of origin',
        'Район переміщення занадто близький до місця походження',
      ],
      'list_name': 'rejected_reason',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '7fe083428c',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'rejected_reason',
    },
    {
      'name': 'other_specify',
      '$kuid': 'ed93903948',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'rejected_reason',
    },
    {
      'name': 'none',
      '$kuid': '9d82964c50',
      'label': [
        'None',
        'Жодного',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'property_ownership_for_apartment_house',
      '$kuid': '7ed8c570a5',
      'label': [
        'Property ownership for apartment/house',
        'Право власності на квартиру/будинок',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'property_ownership_certificate_for_land',
      '$kuid': 'd1d3f1aade',
      'label': [
        'Property ownership certificate for land',
        'Свідоцтво про право власності на землю',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'lease_agreement_for_house_apartment',
      '$kuid': '31108aeea2',
      'label': [
        'Lease agreement for house/apartment',
        'Договір оренди будинку/квартири',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'bti_certificate',
      '$kuid': '37c6d6fdb0',
      'label': [
        'BTI certificate',
        'Довідка БТІ',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'inheritance_certificate',
      '$kuid': 'ec286b2699',
      'label': [
        'Inheritance certificate',
        'Свідоцтво про право на спадщину',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'death_certificate_of_predecessor',
      '$kuid': 'd82209760a',
      'label': [
        'Death certificate of predecessor',
        'Свідоцтво про смерть попередника',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '453601b3e6',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'other_specify',
      '$kuid': '16a3c54953',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'length_of_administrative_procedures',
      '$kuid': '7905a48210',
      'label': [
        'Length of administrative procedures',
        'Тривалість адміністративних процедур',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'cost_of_administrative_procedures',
      '$kuid': 'ee26e1c6b6',
      'label': [
        'Cost of administrative procedures',
        'Вартість адміністративних процедур',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'lack_of_information',
      '$kuid': '324ffa067d',
      'label': [
        'Lack of information',
        'Відсутність інформації',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'distance_or_cost_of_transportation',
      '$kuid': 'e2851d8b21',
      'label': [
        'Distance or cost of transportation',
        'Відстань або вартість транспортування',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'lack_of_devices_or_internet',
      '$kuid': '33229db1cd',
      'label': [
        'Lack of devices or internet connectivity',
        'Відсутність пристроїв або Інтернету',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'lack_of_legal_support',
      '$kuid': '1c743602dc',
      'label': [
        'Lack of legal support',
        'Відсутність правової допомоги',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'inability_of_service',
      '$kuid': 'dbc767a152',
      'label': [
        'Inability of the service to provide documentation',
        'Нездатність служби надати документацію',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'discrimination',
      '$kuid': 'fe02e62d5b',
      'label': [
        'Discrimination',
        'Дискримінація',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'distrust_of_authorities',
      '$kuid': '6022a762ff',
      'label': [
        'Distrust of public institutions and authorities',
        'Недовіра до державних інститутів та влади',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'no',
      '$kuid': 'c03bc50e3a',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '8e694732a5',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'presence_of_armed_or_security_actors',
      '$kuid': '47ac7773b5',
      'label': [
        'Presence of armed or security actors',
        'Присутність озброєних суб\'єктів або силових структур',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'bombardment_shelling_or_threat_of_shelling',
      '$kuid': 'c690ed08e5',
      'label': [
        'Bombardment/shelling or threat of shelling',
        'Бомбардування/обстріл або загроза обстрілу',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'fighting_between_armed_or_security_actors',
      '$kuid': 'cfad9a75a2',
      'label': [
        'Fighting between armed or security actors',
        'Бійки між озброєними суб\'єктами або представниками силових структур',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'landmines_or_uxos_contamination',
      '$kuid': '7275071ed2',
      'label': [
        'Landmines or UXOs contamination',
        'Забруднення наземними мінами або вибухонебезпечними залишками війни',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'criminality',
      '$kuid': 'ab275933a2',
      'label': [
        'Criminality',
        'Злочинність',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'intercommunity_tensions',
      '$kuid': '45630c938a',
      'label': [
        'Intercommunity tensions',
        'Міжсуспільна напруга',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'risks_of_eviction',
      '$kuid': 'c4991cd93a',
      'label': [
        'Risks of eviction',
        'Ризики виселення',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'risks_of_arbitrary_arrest_detention',
      '$kuid': 'e6253d9720',
      'label': [
        'Risks of arbitrary arrest/detention',
        'Ризики свавільного арешту/затримання',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'risks_of_abduction_or_enforced_disappearance',
      '$kuid': '134868270d',
      'label': [
        'Risks of abduction or enforced disappearance',
        'Ризики викрадення або насильницького зникнення',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'risks_of_sexual_violence_and_exploitation',
      '$kuid': '7b45e86400',
      'label': [
        'Risks of sexual violence and exploitation',
        'Ризики сексуального насильства та експлуатації',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'a7c6c97f60',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'other',
      '$kuid': 'd8f7dada07',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': '_1_very_bad',
      '$kuid': 'd44d89d45a',
      'label': [
        '1 - Very bad',
        '1 - Дуже погано',
      ],
      'list_name': 'community_rel',
    },
    {
      'name': '_2_bad',
      '$kuid': '904c58b4e4',
      'label': [
        '2 - Bad',
        '2 - Погано',
      ],
      'list_name': 'community_rel',
    },
    {
      'name': '_3_acceptable',
      '$kuid': '53239c4f82',
      'label': [
        '3 - Acceptable',
        '3 - Прийнятно',
      ],
      'list_name': 'community_rel',
    },
    {
      'name': '_4_good',
      '$kuid': 'ae6207b5f0',
      'label': [
        '4 - Good',
        '4 - Добре',
      ],
      'list_name': 'community_rel',
    },
    {
      'name': '_5_very_good',
      '$kuid': '50e5712c35',
      'label': [
        '5 - Very good',
        '5 - Дуже добре',
      ],
      'list_name': 'community_rel',
    },
    {
      'name': 'language_difference',
      '$kuid': '011f6aa694',
      'label': [
        'Language difference',
        'Мовна різниця',
      ],
      'list_name': 'rel_factors',
    },
    {
      'name': 'tension_over_access_to_humanitarian_assistance',
      '$kuid': 'dd162ffcfb',
      'label': [
        'Tension over access to humanitarian assistance',
        'Напруга навколо доступу до гуманітарної допомоги',
      ],
      'list_name': 'rel_factors',
    },
    {
      'name': 'tension_over_access_to_services_and_or_employment_opportunities',
      '$kuid': '9ad95db2ed',
      'label': [
        'Tension over access to services and/or employment opportunities',
        'Напруга щодо доступу до послуг та/або можливостей працевлаштування',
      ],
      'list_name': 'rel_factors',
    },
    {
      'name': 'tension_over_conscription_procedures',
      '$kuid': 'ba1b0f8db3',
      'label': [
        'Tension over conscription procedures',
        'Напруга навколо призову на військову службу',
      ],
      'list_name': 'rel_factors',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '1e5be226f9',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'rel_factors',
    },
    {
      'name': 'other_specify',
      '$kuid': 'c6527e560d',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'rel_factors',
    },
    {
      'name': 'harassment_violence_or_abuse',
      '$kuid': '2409c6002d',
      'label': [
        'Harassment, violence or abuse',
        'Переслідування, насильство або образа',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'discrimination_over_access_to_basic_services',
      '$kuid': 'b36cc92c1d',
      'label': [
        'Discrimination over access to basic services',
        'Дискримінація щодо доступу до основних послуг',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'restrictions_on_participation_in_public_affairs_and_community_events',
      '$kuid': '8fbd242eff',
      'label': [
        'Restrictions on participation in public affairs and community events',
        'Обмеження на участь у громадських справах та громадських заходах',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'dispute_over_access_to_humanitarian_assistance',
      '$kuid': '278dca646b',
      'label': [
        'Dispute over access to humanitarian assistance',
        'Суперечки щодо доступу до гуманітарної допомоги',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'dispute_or_conflict_over_land_shelter_property',
      '$kuid': 'cac5750e9a',
      'label': [
        'Dispute or conflict over land, shelter, property',
        'Суперечки або конфлікт щодо землі, житла, власності',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'dispute_or_conflict_over_livelihood_or_other_financial_resources',
      '$kuid': 'fa8f4374e7',
      'label': [
        'Dispute or conflict over livelihood or other financial resources',
        'Суперечки або конфлікт щодо засобів до існування чи інших фінансових ресурсів',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'dispute_or_conflict_over_ethic_political_or_social_issues',
      '$kuid': 'b99d3d76ac',
      'label': [
        'Dispute or conflict over ethic, political or social issues',
        'Суперечки або конфлікт з етичних, політичних чи соціальних питань',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'no_incident_experienced',
      '$kuid': 'b0b86ad627',
      'label': [
        'No incident experienced',
        'Жодного інциденту не було',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'f2c43ff65e',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'other_specify',
      '$kuid': 'ddd8f329ca',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'no',
      '$kuid': 'af7979dfd1',
      'label': [
        'No',
        'Hi',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'fear_of_conscription_including_selfrestriction_of_movement',
      '$kuid': 'e527cc5582',
      'label': [
        'Fear of conscription, including self-restriction of movement',
        'Страх призову, в тому числі самообмеження пересування',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'lack_of_documentation',
      '$kuid': 'ece60dfa93',
      'label': [
        'Lack of documentation',
        'Відсутність документації',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'armed_conflict_including_shelling',
      '$kuid': '2875702448',
      'label': [
        'Armed conflict, including shelling',
        'Збройний конфлікт, включно з обстрілами',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'presence_of_explosive_ordnance',
      '$kuid': 'd06fb8c4c2',
      'label': [
        'Presence of explosive ordnance',
        'Наявність вибухонебезпечних предметів',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'risks_of_sexual_violence_and_exploitation',
      '$kuid': '73566c5870',
      'label': [
        'Risks of sexual violence and exploitation',
        'Ризики сексуального насильства та експлуатації',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'discrimination',
      '$kuid': '23e97dcd18',
      'label': [
        'Discrimination',
        'Дискримінація',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'intercommunity_tensions',
      '$kuid': '91553f49db',
      'label': [
        'Intercommunity tensions',
        'Міжсуспільна напруга',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'lack_of_transportationfinancial_resources_to_pay_transportation',
      '$kuid': 'd28496a43a',
      'label': [
        'Lack of transportation/financial resources to pay transportation',
        'Відсутність транспортних/фінансових ресурсів для оплати проїзду',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'reduced_mobility_linked_with_health_issues_or_disability',
      '$kuid': '333767e827',
      'label': [
        'Reduced mobility linked with health issues or disability',
        'Обмеження рухливості, пов’язане з проблемами зі здоров’ям або інвалідністю',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '3064d6cf47',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'other_specify',
      '$kuid': '8afd93371a',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': '_1_very_unsafe',
      '$kuid': '82d94ae6fa',
      'label': [
        '1 - Very unsafe',
        '1 - Дуже небезпечно',
      ],
      'list_name': 'safety_level',
    },
    {
      'name': '_2_unsafe',
      '$kuid': 'a62620c29d',
      'label': [
        '2 - Unsafe',
        '2 - Небезпечно',
      ],
      'list_name': 'safety_level',
    },
    {
      'name': '_3_safe',
      '$kuid': 'd6923d0230',
      'label': [
        '3 - Safe',
        '3 - Безпечно',
      ],
      'list_name': 'safety_level',
    },
    {
      'name': '_4_very_safe',
      '$kuid': '29a693e650',
      'label': [
        '4 - Very safe',
        '4 - Дуже безпечно',
      ],
      'list_name': 'safety_level',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'fe47276b4c',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'safety_level',
    },
    {
      'name': 'killing',
      '$kuid': '9201c9b90a',
      'label': [
        'Killing',
        'Вбивство',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'injury_indiscriminate_attack',
      '$kuid': '640894e3d3',
      'label': [
        'Injury due to indiscriminate attacks',
        'Поранення внаслідок невибіркових нападів',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'abduction',
      '$kuid': '6b93cfb973',
      'label': [
        'Abduction or enforced disappearance',
        'Викрадення або насильницьке зникнення',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'arbitrary_detention',
      '$kuid': '7158bb75f6',
      'label': [
        'Arbitrary arrest or detention',
        'Безпідставний арешт або затримання',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'forced_recruitment',
      '$kuid': 'e211a50f5a',
      'label': [
        'Forced recruitment',
        'Примусова вербовка',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'physical_assault',
      '$kuid': '3c0b97d2a7',
      'label': [
        'Physical assault',
        'Фізичний напад',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'sexual_violence',
      '$kuid': '7b495cb45e',
      'label': [
        'Sexual violence',
        'Сексуальне насильство',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'forced_labour',
      '$kuid': '7c5a434898',
      'label': [
        'Forced or exploitative labour',
        'Примусова або експлуататорська праця',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'property_destruction',
      '$kuid': '270a3c2169',
      'label': [
        'Destruction of property',
        'Знищення майна',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'theft_robbery',
      '$kuid': 'b8b4b8856d',
      'label': [
        'Theft or robbery',
        'Крадіжка або грабіж',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'denial_basic_services',
      '$kuid': 'd2a88be995',
      'label': [
        'Denial of basic services or aid',
        'Відмова в доступі до базових послуг або допомоги',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '51ce54ae8a',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'none',
      '$kuid': 'e61ebab8bc',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'other_specify',
      '$kuid': 'e023f18865',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'age',
      '$kuid': '3c24ca2589',
      'label': [
        'Age',
        'Вік',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'gender',
      '$kuid': 'ee5a0e38a1',
      'label': [
        'Gender',
        'Стать',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'disability',
      '$kuid': '3857a993ec',
      'label': [
        'Disability',
        'Інвалідність',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'nationality',
      '$kuid': 'f1e66a4468',
      'label': [
        'Nationality',
        'Національність',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'ethnicity',
      '$kuid': 'a06e8bb3f0',
      'label': [
        'Ethnicity',
        'Етнічна приналежність',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'religion',
      '$kuid': '02abc1a437',
      'label': [
        'Religion',
        'Релігія',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'language',
      '$kuid': 'e0eb33a698',
      'label': [
        'Language',
        'Мова',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'political_opinion',
      '$kuid': '0e8bd7aef2',
      'label': [
        'Political opinions',
        'Політичні погляди',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'medical_condition',
      '$kuid': '59d60f125d',
      'label': [
        'Medical condition',
        'Стан здоров\'я',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '13fe1c503c',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'none',
      '$kuid': 'f6d5863f22',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'other_specify',
      '$kuid': '67a1a4596a',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'feeling_sad_depressed_tired',
      '$kuid': '36f82fcefb',
      'label': [
        'Feeling sad or depressed or tired',
        'Почуття смутку або депресії або втоми',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'withdrawal_isolation',
      '$kuid': '176858a007',
      'label': [
        'Withdrawal or isolation',
        'Відсторонення або ізоляція',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'anxiety',
      '$kuid': '7a60b6b04a',
      'label': [
        'Anxiety',
        'Тривога',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'anger',
      '$kuid': 'b49c9c710f',
      'label': [
        'Anger',
        'Гнів',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'fear',
      '$kuid': 'fbb0698752',
      'label': [
        'Fear',
        'Страх',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'agitation_moodiness',
      '$kuid': 'faa8086146',
      'label': [
        'Agitation or moodiness',
        'Неспокій або мінливість настрою',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'feeling_hopeless',
      '$kuid': '97fdfb97a1',
      'label': [
        'Feeling hopeless',
        'Почуття безнадії',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'no_sign_of_distress',
      '$kuid': '59b13f25f5',
      'label': [
        'No sign of psychological distress',
        'Жодних ознак психологічного розладу',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '79bb397e6e',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'none',
      '$kuid': 'a369d9c4be',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'other_specify',
      '$kuid': '03f688324a',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'lack_services',
      '$kuid': 'cd677f70fc',
      'label': [
        'Lack of available services',
        'Відсутність доступних послуг',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'lack_information',
      '$kuid': '3a26440c8d',
      'label': [
        'Lack of information about services',
        'Відсутність інформації про послуги',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'distance_transport',
      '$kuid': '102a9d8524',
      'label': [
        'Distance or lack of transportation',
        'Відстань або відсутність транспорту',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'cost_transport',
      '$kuid': 'b4c1d489c1',
      'label': [
        'Cost of transportation',
        'Витрати на транспорт',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'cost_services',
      '$kuid': '467924e0f8',
      'label': [
        'Cost of services or medication',
        'Вартість послуг або ліків',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'language_barrier',
      '$kuid': '17358ac807',
      'label': [
        'Language barriers',
        'Мовні бар\'єри',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'documentation_required',
      '$kuid': 'f008a1164d',
      'label': [
        'Documentation requirements',
        'Вимоги до документації',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'poor_quality',
      '$kuid': 'bec1276c16',
      'label': [
        'Poor quality of services',
        'Низька якість послуг',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '5966c3caa1',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'none',
      '$kuid': 'def0a4942a',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'other_specify',
      '$kuid': '6be66d7339',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'displacement_stress',
      '$kuid': '4a9c161691',
      'label': [
        'Displacement-related stress',
        'Стрес пов’язаний з переміщенням',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'fear_armed_violence',
      '$kuid': 'a2d78acfb8',
      'label': [
        'Fear of armed violence',
        'Страх збройного насильства',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'property_damage_fear',
      '$kuid': '0c3203be98',
      'label': [
        'Fear of property damage',
        'Страх пошкодження майна',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'fear_sexual_violence',
      '$kuid': '773e9df982',
      'label': [
        'Fear of sexual violence',
        'Страх сексуального насильства',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'missing_family',
      '$kuid': '8f16bf513c',
      'label': [
        'Missing family members',
        'Зниклі члени сім’ї',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'lack_basic_services',
      '$kuid': 'e53cec5fe9',
      'label': [
        'Lack of access to basic services',
        'Відсутність доступу до базових послуг',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'lack_employment',
      '$kuid': '0604e2c243',
      'label': [
        'Lack of employment opportunities',
        'Відсутність можливостей працевлаштування',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'worries_children',
      '$kuid': '2f26afe36b',
      'label': [
        'Worries about children',
        'Стурбованість про дітей',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'worries_future',
      '$kuid': '238db5a4b5',
      'label': [
        'Worries about the future',
        'Стурбованість про майбутнє',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '42eb5a2d4e',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'none',
      '$kuid': '500eb1284e',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'other_specify',
      '$kuid': '0a368e47b9',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'salary_formal',
      '$kuid': 'f2657a0ed6',
      'label': [
        'Salary – formal employment',
        'Зарплата – офіційне працевлаштування',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'casual',
      '$kuid': 'c17b14b73c',
      'label': [
        'Casual / temporary labour',
        'Випадкова (тимчасова) праця',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'remittances',
      '$kuid': '94e9c82226',
      'label': [
        'Remittances',
        'Грошові перекази',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'family_support',
      '$kuid': '10bcb70c65',
      'label': [
        'Assistance from family / friends',
        'Підтримка з боку родини / друзів',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'debt',
      '$kuid': '366c8eb781',
      'label': [
        'Debt',
        'Борг',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'savings',
      '$kuid': '3cc27c4574',
      'label': [
        'Savings',
        'Заощадження',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'humanitarian',
      '$kuid': '1e16cccbc4',
      'label': [
        'Humanitarian assistance (cash or in-kind)',
        'Гуманітарна допомога (готівкою або в натуральній формі)',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'business',
      '$kuid': 'e21ba8850a',
      'label': [
        'Business / self-employment',
        'Бізнес / самозайнятість',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'social_protection',
      '$kuid': 'fec7555519',
      'label': [
        'Social protection payments',
        'Виплати соціального захисту',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'none',
      '$kuid': '08ec55e216',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'unable',
      '$kuid': 'f74f6f331c',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'idp_allowance',
      '$kuid': '9c16833676',
      'label': [
        'IDP allowance',
        'Допомога ВПО',
      ],
      'list_name': 'social_support',
    },
    {
      'name': 'pension_elderly',
      '$kuid': '7de6c90f0c',
      'label': [
        'Pension for elderly people',
        'Пенсія для людей похилого віку',
      ],
      'list_name': 'social_support',
    },
    {
      'name': 'pension_disability',
      '$kuid': 'd03ea32437',
      'label': [
        'Pension for persons with disability',
        'Пенсія для людей з інвалідністю',
      ],
      'list_name': 'social_support',
    },
    {
      'name': 'pension_children',
      '$kuid': 'e4c4ba3587',
      'label': [
        'Pension for 3 or more children',
        'Пенсія на 3 або більше дітей',
      ],
      'list_name': 'social_support',
    },
    {
      'name': 'none',
      '$kuid': '8d0e3609d6',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'social_support',
    },
    {
      'name': 'unable',
      '$kuid': '84158853aa',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'social_support',
    },
    {
      'name': 'no_income',
      '$kuid': '87c642e902',
      'label': [
        'No income',
        'Доходи відсутні',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': 'up_to_3000',
      '$kuid': '7d448590b6',
      'label': [
        'Up to 3,000 UAH',
        'До 3000 грн',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': '3001_6000',
      '$kuid': '3d9e2b8a38',
      'label': [
        '3,001–6,000 UAH',
        'Від 3001 до 6000 грн',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': '6001_9000',
      '$kuid': 'a73733602a',
      'label': [
        '6,001–9,000 UAH',
        'Від 6001 до 9000 грн',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': '9001_12000',
      '$kuid': '8630a8f758',
      'label': [
        '9,001–12,000 UAH',
        'Від 9001 до 12000 грн',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': '12001_15000',
      '$kuid': 'abd28d26ac',
      'label': [
        '12,001–15,000 UAH',
        'Від 12 001 до 15 000 грн',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': 'over_15000',
      '$kuid': '2744f04151',
      'label': [
        'More than 15,000 UAH',
        'Більше 15 000 грн',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': 'unable',
      '$kuid': '73a96cad0a',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': 'no_jobs',
      '$kuid': '1eb8b4de95',
      'label': [
        'Lack of available jobs',
        'Відсутність робочих місць',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'low_season',
      '$kuid': 'a26995b0f9',
      'label': [
        'Low or off season',
        'Низький або позасезонний період',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'skill_mismatch',
      '$kuid': 'c4f3abd2bf',
      'label': [
        'Skills do not match demand',
        'Навички не відповідають попиту',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'caregiving',
      '$kuid': '33eae16b54',
      'label': [
        'Housework / caring for children',
        'Робота по дому / догляд за дітьми',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'no_info',
      '$kuid': 'ce86f25db9',
      'label': [
        'Lack of job market information',
        'Відсутність інформації про ринок праці',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'no_experience',
      '$kuid': '1f9cf88661',
      'label': [
        'Lack of experience',
        'Відсутність досвіду',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'disability',
      '$kuid': '3ef3730f0a',
      'label': [
        'Physical limitations / disability',
        'Фізичні обмеження / інвалідність',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'age_discrimination',
      '$kuid': '7084f33336',
      'label': [
        'Age discrimination',
        'Дискримінація за віком',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'mines',
      '$kuid': 'e25deba888',
      'label': [
        'Mine contamination',
        'Мінне забруднення',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'none',
      '$kuid': '6d40b32413',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'unable',
      '$kuid': 'a54ab29671',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'savings',
      '$kuid': '3d0cd17a5d',
      'label': [
        'Spending savings',
        'Використання заощаджень',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'sell_assets',
      '$kuid': 'd640c45f68',
      'label': [
        'Selling household assets',
        'Продаж майна домогосподарства',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'sell_aid',
      '$kuid': 'fe848c3a76',
      'label': [
        'Selling humanitarian assistance',
        'Продаж гуманітарної допомоги',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'sell_house',
      '$kuid': '133aa69cbf',
      'label': [
        'Selling housing or land',
        'Продаж житла або землі',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'borrow',
      '$kuid': '7ec19bfc55',
      'label': [
        'Borrowing money',
        'Позика грошей',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'family_support',
      '$kuid': 'fc9709095c',
      'label': [
        'Relying on family / external support',
        'Залежність від підтримки родини',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'begging',
      '$kuid': 'd86430ea4c',
      'label': [
        'Begging',
        'Жебракування',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'dangerous_work',
      '$kuid': 'ef1aca504b',
      'label': [
        'Dangerous or exploitative work',
        'Небезпечна або експлуатаційна робота',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'less_food',
      '$kuid': '555742fad4',
      'label': [
        'Reducing food consumption',
        'Зменшення споживання їжі',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'less_health',
      '$kuid': '46ce38bfd3',
      'label': [
        'Reducing healthcare or medicines',
        'Зменшення медичних послуг або ліків',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'child_labour',
      '$kuid': 'ce88465fe6',
      'label': [
        'Sending children to work',
        'Направлення дітей на роботу',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'no_school',
      '$kuid': 'cc023a56aa',
      'label': [
        'Removing children from education',
        'Відсторонення дітей від навчання',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'relocate',
      '$kuid': '8b965af3f6',
      'label': [
        'Sending members elsewhere',
        'Відправлення членів ДГ жити в інше місце',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'poor_housing',
      '$kuid': '0a588e6856',
      'label': [
        'Choosing worse accommodation',
        'Вибір менш придатного житла',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'none',
      '$kuid': '9caa75da7f',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'unable',
      '$kuid': '8f85653c28',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'all',
      '$kuid': '41540431fb',
      'label': [
        'All children attend',
        'Усі діти відвідують',
      ],
      'list_name': 'school_attendance_status',
    },
    {
      'name': 'partial',
      '$kuid': '090a602034',
      'label': [
        'Some children attend',
        'Деякі діти відвідують',
      ],
      'list_name': 'school_attendance_status',
    },
    {
      'name': 'none',
      '$kuid': '7edd713576',
      'label': [
        'None attend',
        'Жодна дитина не відвідує',
      ],
      'list_name': 'school_attendance_status',
    },
    {
      'name': 'unable',
      '$kuid': 'fde7681099',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'school_attendance_status',
    },
    {
      'name': 'newly_displaced',
      '$kuid': 'b5cea8e498',
      'label': [
        'Newly displaced',
        'Нещодавно переміщені',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'no_school',
      '$kuid': '1302c16fa6',
      'label': [
        'Lack of available school',
        'Відсутність школи',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'no_internet',
      '$kuid': '7d54ba1626',
      'label': [
        'No internet for online school',
        'Відсутність Інтернету',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'safety',
      '$kuid': '1f00f4352f',
      'label': [
        'Safety risks',
        'Ризики для безпеки',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'distance',
      '$kuid': '5139e6fa86',
      'label': [
        'Distance / transport barrier',
        'Відстань / транспорт',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'transport_cost',
      '$kuid': '9bfdfaaf0c',
      'label': [
        'Transportation cost',
        'Вартість транспорту',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'online_cost',
      '$kuid': '36069bbefc',
      'label': [
        'Online education cost',
        'Вартість онлайн-навчання',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'no_docs',
      '$kuid': 'd9a95efbfe',
      'label': [
        'Lack of documentation',
        'Відсутність документів',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'no_cert',
      '$kuid': '90b60dde68',
      'label': [
        'Lack of recognized certificates',
        'Відсутність визнаних довідок',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'discrimination',
      '$kuid': '1312790794',
      'label': [
        'Discrimination / restriction',
        'Дискримінація / обмеження',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'special_needs',
      '$kuid': '560a1437b3',
      'label': [
        'No specialized services',
        'Відсутність спецпослуг',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'materials_cost',
      '$kuid': 'd9e6ceda4d',
      'label': [
        'Cost of materials',
        'Вартість матеріалів',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'language',
      '$kuid': '4c6c9c3b04',
      'label': [
        'Language barriers',
        'Мовні бар’єри',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'none',
      '$kuid': '2de0824f36',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'unable',
      '$kuid': '003b89fabe',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'house',
      '$kuid': 'a87e2cc859',
      'label': [
        'House / apartment',
        'Будинок / квартира',
      ],
      'list_name': 'housing_type',
    },
    {
      'name': 'room',
      '$kuid': '556fae035b',
      'label': [
        'Room in private house',
        'Кімната в приватному будинку',
      ],
      'list_name': 'housing_type',
    },
    {
      'name': 'shelter',
      '$kuid': '55d508977a',
      'label': [
        'Collective shelter',
        'Колективний притулок',
      ],
      'list_name': 'housing_type',
    },
    {
      'name': 'private_shelter',
      '$kuid': 'da8c0bf189',
      'label': [
        'Private collective shelter',
        'Приватний колективний притулок',
      ],
      'list_name': 'housing_type',
    },
    {
      'name': 'none',
      '$kuid': '9165f0fcef',
      'label': [
        'No shelter',
        'Немає притулку',
      ],
      'list_name': 'housing_type',
    },
    {
      'name': 'unable',
      '$kuid': '6d04f81e5b',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'housing_type',
    },
    {
      'name': 'host_family',
      '$kuid': '2d67d91b30',
      'label': [
        'Host family (no rent)',
        'Проживання в сім’ї',
      ],
      'list_name': 'tenure_status',
    },
    {
      'name': 'rent',
      '$kuid': '0b523b7abb',
      'label': [
        'Renting accommodation',
        'Оренда житла',
      ],
      'list_name': 'tenure_status',
    },
    {
      'name': 'own',
      '$kuid': '0648e3bc01',
      'label': [
        'Owning accommodation',
        'Власне житло',
      ],
      'list_name': 'tenure_status',
    },
    {
      'tag': 'відповідати',
      'name': 'squat',
      '$kuid': '8d9f9cd56b',
      'label': [
        'Squatting without permission',
        'Самовільне проживання',
      ],
      'list_name': 'tenure_status',
    },
    {
      'name': 'none',
      '$kuid': '428cd7e780',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'tenure_status',
    },
    {
      'name': 'unable',
      '$kuid': '8398409c60',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'tenure_status',
    },
    {
      'name': 'good',
      '$kuid': 'ba20386ffc',
      'label': [
        'Sound condition',
        'Непошкоджений стан',
      ],
      'list_name': 'housing_condition',
    },
    {
      'name': 'partial',
      '$kuid': '48c3c58b2f',
      'label': [
        'Partially damaged',
        'Частково пошкоджене',
      ],
      'list_name': 'housing_condition',
    },
    {
      'name': 'severe',
      '$kuid': '059dd0355f',
      'label': [
        'Severely damaged',
        'Сильно пошкоджене',
      ],
      'list_name': 'housing_condition',
    },
    {
      'name': 'destroyed',
      '$kuid': '5eacbe4624',
      'label': [
        'Destroyed',
        'Зруйноване',
      ],
      'list_name': 'housing_condition',
    },
    {
      'name': 'unfinished',
      '$kuid': '40473338d8',
      'label': [
        'Unfinished',
        'Незакінчене',
      ],
      'list_name': 'housing_condition',
    },
    {
      'name': 'unable',
      '$kuid': 'be90edc591',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'housing_condition',
    },
    {
      'name': 'none',
      '$kuid': '02f0b41f6a',
      'label': [
        'None',
        'Жодного',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'eviction',
      '$kuid': 'b0be37e346',
      'label': [
        'Risk of eviction',
        'Ризик виселення',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'damage',
      '$kuid': '01e622ff5b',
      'label': [
        'Housing condition issues',
        'Пошкодження житла',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'overcrowded',
      '$kuid': '176fbc6be6',
      'label': [
        'Overcrowding / lack of privacy',
        'Переповнення / відсутність приватності',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'utilities',
      '$kuid': 'c9750985a2',
      'label': [
        'Lack of utilities',
        'Відсутність комунальних послуг',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'connectivity',
      '$kuid': '8b7c932e73',
      'label': [
        'Lack of connectivity',
        'Відсутність зв’язку',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'safety',
      '$kuid': 'dc3b06a002',
      'label': [
        'Security risks',
        'Ризики безпеки',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'compensation',
      '$kuid': '556f2a4606',
      'label': [
        'No compensation for damage',
        'Відсутність компенсації',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'documents',
      '$kuid': '60d40965c9',
      'label': [
        'Missing ownership documents',
        'Відсутність документів',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'disability',
      '$kuid': '0137a9b24f',
      'label': [
        'Not disability inclusive',
        'Не пристосоване для людей з інвалідністю',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'unable',
      '$kuid': '4ea19b3024',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'uhf',
      '$kuid': 'ccebb3de2d',
      'label': [
        'UHF',
        'UHF',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'echo',
      '$kuid': 'e4232adf4b',
      'label': [
        'ECHO',
        'ECHO',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'sumy',
      '$kuid': '66da9d34f7',
      'label': [
        'Sumy (UMY)',
        'Суми (UMY)',
      ],
      'list_name': 'office',
    },
    {
      'name': 'chernihiv',
      '$kuid': '7e0a9672f0',
      'label': [
        'Chernihiv (CEJ)',
        'Чернігів (CEJ)',
      ],
      'list_name': 'office',
    },
    {
      'name': 'dnipro',
      '$kuid': '0e97926a9d',
      'label': [
        'Dnipro (DNK)',
        'Дніпро (DNK)',
      ],
      'list_name': 'office',
    },
    {
      'name': 'kharkiv',
      '$kuid': '1c09e70e55',
      'label': [
        'Kharkiv (HRK)',
        'Харків (HRK)',
      ],
      'list_name': 'office',
    },
    {
      'name': 'mykolaiv',
      '$kuid': '03dc098fb5',
      'label': [
        'Mykolaiv (NLV)',
        'Миколаїв (NLV)',
      ],
      'list_name': 'office',
    },
    {
      'name': 'sloviansk',
      '$kuid': 'f1ce18ca79',
      'label': [
        'Sloviansk (SLO)',
        'Слов\'янськ (SLO)',
      ],
      'list_name': 'office',
    },
  ],
  'translated': [
    'label',
    'hint',
  ],
  'translations': [
    'en (en)',
    'ua (ua)',
  ],
} as Api.Form.Schema

export const formHssVersion: Prisma.FormVersionCreateManyInput = {
  formId: formHhs.id!,
  schemaJson: formHhsSchema,
  version: 1,
  status: 'active',
  uploadedBy: createdBySystem,
}
