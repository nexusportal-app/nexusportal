import {createdBySystem, demoWorkspaceId} from '../utils.js'
import {Api} from '@infoportal/api-sdk'
import {Prisma} from '@infoportal/prisma'

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
      '$kuid': 'de4c0a3837',
      'label': [
        'Context',
        'Контекст',
      ],
      '$xpath': 'context',
    },
    {
      'name': 'back_office',
      'type': 'select_one',
      '$kuid': '5e9d55d5f7',
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
      '$kuid': '2e9979a382',
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
      '$kuid': 'f523d82805',
    },
    {
      'name': 'bio',
      'type': 'begin_group',
      '$kuid': 'b857f5553a',
      'label': [
        'Basic bio data',
        'Основні біодані',
      ],
      '$xpath': 'bio',
    },
    {
      'name': 'current_oblast',
      'type': 'select_one',
      '$kuid': '23f8b7f1d3',
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
      '$kuid': '83d4f78c95',
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
      '$kuid': 'dd458868b5',
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
      '$kuid': '807a5d34d9',
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
      '$kuid': '067dd8beab',
    },
    {
      'name': 'household ',
      'type': 'begin_group',
      '$kuid': 'db288c27ac',
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
      '$kuid': 'a5cb1efe16',
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
      '$kuid': '51b9ba198c',
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
      'name': 'head_hh_specific_needs',
      'type': 'select_multiple',
      '$kuid': 'd22b6d266c',
      'label': [
        'Do any of these specifics needs categories apply to the head(s) of this household?',
        'Чи властиві (чи має голова) голові цього домогосподарства наведені характеристики (or вразливості)?',
      ],
      '$xpath': 'household /head_hh_specific_needs',
      'required': true,
      'constraint': 'not(selected(., \'unable_unwilling_to_answer\') and (selected(., \'pregnant_and_lactating_woman\') or selected(., \'child_headed_household\') or selected(., \'elder__headed_household\') or selected(., \'person_with_disability_headed_household\') or selected(., \'chronicallyill_headed_household\') or selected(., \'no_specific_needs\') or selected(., \'other_specify\'))) and not(selected(., \'no_specific_needs\') and (selected(., \'pregnant_and_lactating_woman\') or selected(., \'child_headed_household\') or selected(., \'elder__headed_household\') or selected(., \'person_with_disability_headed_household\') or selected(., \'chronicallyill_headed_household\') or selected(., \'unable_unwilling_to_answer\') or selected(., \'other_specify\')))',
      'select_from_list_name': 'specfic_needs',
      'constraint_message:en (en)': 'Cannot have these options checked together.',
      'constraint_message:ua (ua)': 'Ці параметри не можна перевіряти разом.',
    },
    {
      'name': 'persons',
      'type': 'begin_repeat',
      '$kuid': '696a4363c3',
      '$xpath': 'household /persons',
      'appearance': 'field-list',
      'repeat_count': '${household_size}',
    },
    {
      'name': 'gender',
      'type': 'select_one',
      '$kuid': '676bb50172',
      'label': [
        'Select the GENDER of HH member',
        'Bкажіть СТАТЬ члена домогосподарства',
      ],
      '$xpath': 'household /persons/gender',
      'required': 'true',
      'appearance': 'horizontal-compact',
      'select_from_list_name': 'gender',
    },
    {
      'name': 'age',
      'type': 'integer',
      '$kuid': 'e6273a4bfa',
      'label': [
        'Indicate the AGE of HH member',
        'Bкажіть ВІК члена домогосподарства',
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
      '$kuid': '8f786ee41f',
      'label': [
        'Indicate if HH member has a lot of difficulty (or cannot do at all) any of the following?',
        'Чи є у вас член сім\'ї, який відчуває великі труднощі (або повністю не спроможний) з чимось з наведеного переліку?',
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
      '$kuid': '16e6cc3406',
    },
    {
      'name': 'separated_any',
      'type': 'select_one',
      '$kuid': '1d3b935ed5',
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
      '$kuid': '52779f1f8c',
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
      '$kuid': '95ac926742',
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
      '$kuid': 'c2fb6c4fec',
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
      '$kuid': 'e395fcd4f3',
      'label': [
        'Why did this person remain in the area of origin?',
        'Чому ця особа залишилася в районі походження? ${current_location}=\'area_of_origin\'',
      ],
      '$xpath': 'household /separated_member/reason_left_behind',
      'select_from_list_name': 'reason',
    },
    {
      'type': 'end_repeat',
      '$kuid': 'efbe566c03',
    },
    {
      'type': 'end_group',
      '$kuid': 'b34d4b7c27',
    },
    {
      'name': 'disp_info',
      'type': 'begin_group',
      '$kuid': '36448bb4a9',
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
      '$kuid': 'fc3c71f4e1',
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
      '$kuid': 'c845e25c71',
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
      '$kuid': 'c804748a04',
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
      '$kuid': '291eb81bd5',
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
      '$kuid': '79bb642650',
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
      '$kuid': 'b5bc07b733',
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
      '$kuid': '2cc62f8597',
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
      '$kuid': 'd8ddf94365',
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
      '$kuid': '181a71fcc8',
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
      'name': 'security_concerns_during_displacement',
      'type': 'select_multiple',
      '$kuid': 'd228832b6f',
      'label': [
        'Did you or any member of your household experience safety or security concerns on your displacement journey?',
        'Чи відчували ви чи хтось із членів вашої сім’ї проблеми з безпекою під час переміщення?',
      ],
      '$xpath': 'disp_info/security_concerns_during_displacement',
      'relevant': '${disp_status}=\'idp\'',
      'required': true,
      'constraint': 'not(selected(., \'none\') and (selected(., \'looting_robbery\') or selected(., \'physical_assault\') or selected(., \'abduction\') or selected(., \'arbitrary_detention\') or selected(., \'shelling_or_missile_attacks\') or selected(., \'harassment_at_checkpoints\') or selected(., \'movement_restrictions\') or selected(., \'gbv_incident\') or selected(., \'extortion\') or selected(., \'hate_speech\') or selected(., \'unable_unwilling_to_answer\') or selected(., \'other_specify\'))) and not(selected(., \'unable_unwilling_to_answer\') and (selected(., \'none\') or selected(., \'looting_robbery\') or selected(., \'physical_assault\') or selected(., \'abduction\') or selected(., \'arbitrary_detention\') or selected(., \'shelling_or_missile_attacks\') or selected(., \'harassment_at_checkpoints\') or selected(., \'movement_restrictions\') or selected(., \'gbv_incident\') or selected(., \'extortion\') or selected(., \'hate_speech\') or selected(., \'other_specify\')))',
      'select_from_list_name': 'security_concerns_during_displacement',
      'constraint_message:en (en)': 'Cannot have these options checked together.',
      'constraint_message:ua (ua)': 'Ці параметри не можна перевіряти разом.',
    },
    {
      'hint': [
        'Approximate date',
        'Приблизна дата',
      ],
      'name': 'first_displacement_date',
      'type': 'date',
      '$kuid': '52d6c646f4',
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
      '$kuid': '6b74bc5ba4',
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
      '$kuid': '2a29b7bff8',
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
      '$kuid': '69d9d5db53',
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
      '$kuid': '8a53163d66',
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
      '$kuid': 'bafdb32e21',
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
      '$kuid': '423f9395ac',
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
      '$kuid': 'd7114c0f27',
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
      '$kuid': 'bf27e24444',
    },
    {
      'name': 'reg_doc',
      'type': 'begin_group',
      '$kuid': '4589a5eb37',
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
      '$kuid': '973675f167',
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
      '$kuid': 'de8546a42a',
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
      '$kuid': 'c6f489f67a',
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
      '$kuid': 'da63e4361d',
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
      '$kuid': 'f4cefceafd',
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
      '$kuid': 'f64e1303ec',
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
      '$kuid': 'cd57e50c06',
    },
    {
      'name': 'idp_docs',
      'type': 'select_multiple',
      '$kuid': '3d5a0c7b64',
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
      '$kuid': '51418ac7f3',
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
      '$kuid': 'afe54da19e',
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
      '$kuid': '64647ecf71',
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
      '$kuid': '59a669b203',
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
      '$kuid': '159377b404',
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
      '$kuid': 'f5e06a7ce0',
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
      '$kuid': '5e8412cc69',
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
      '$kuid': '90893f6f21',
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
      '$kuid': '9dbd768b44',
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
      '$kuid': 'da23d55e3b',
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
      '$kuid': '26a591ad3e',
      'label': [
        'Please specify',
        'Будь ласка уточніть',
      ],
      '$xpath': 'reg_doc/doc_barriers_other',
      'relevant': 'selected(${doc_barriers},\'other\')',
    },
    {
      'type': 'end_group',
      '$kuid': '9b2b1d9629',
    },
    {
      'name': 'safety_move',
      'type': 'begin_group',
      '$kuid': 'bde86ad147',
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
      '$kuid': '8a207dfd41',
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
      '$kuid': '83bcb85426',
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
      '$kuid': '7228327a5a',
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
      '$kuid': '8233558728',
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
      '$kuid': '009ec0f556',
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
      '$kuid': 'bc932a32d8',
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
      '$kuid': 'db4b1d2f6b',
    },
    {
      'name': 'violence',
      'type': 'begin_group',
      '$kuid': '0877ebc8e4',
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
      '$kuid': '7502997b1d',
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
      '$kuid': '573004885d',
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
      '$kuid': '00943babbb',
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
      '$kuid': 'c8360fffce',
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
      '$kuid': '7065056125',
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
      '$kuid': 'a65d0681ae',
    },
    {
      'name': 'coping',
      'type': 'begin_group',
      '$kuid': '13db770331',
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
      '$kuid': '549b8070e4',
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
      '$kuid': 'cc55e6eef5',
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
      '$kuid': '1fee90d45f',
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
      '$kuid': 'fd7a36b4bd',
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
      '$kuid': '5a9c3c0b8c',
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
      '$kuid': 'e4d8686dc6',
    },
    {
      'name': 'education',
      'type': 'begin_group',
      '$kuid': 'e9050682e9',
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
      '$kuid': '797bdc2ffd',
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
      '$kuid': 'e7b8c3cb88',
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
      '$kuid': 'd7d67e6f64',
    },
    {
      'name': 'housing',
      'type': 'begin_group',
      '$kuid': 'd306e2baec',
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
      '$kuid': '169b286c09',
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
      '$kuid': 'e988296233',
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
      '$kuid': '8af302ca9e',
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
      '$kuid': 'ac17507e05',
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
      '$kuid': '508533be2d',
    },
  ],
  'choices': [
    {
      'name': 'ukrainian',
      '$kuid': '26cb28ef97',
      'label': [
        'Ukrainian',
        'Українська',
      ],
      'list_name': 'citizenship',
    },
    {
      'name': 'stateless',
      '$kuid': 'c6a38f32c8',
      'label': [
        'Stateless',
        'Без громадянства',
      ],
      'list_name': 'citizenship',
    },
    {
      'name': 'non_ukrainian',
      '$kuid': '07f30e6bc7',
      'label': [
        'Non-Ukrainian',
        'Неукраїнське громадянство',
      ],
      'list_name': 'citizenship',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'ea6665b1ba',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'citizenship',
    },
    {
      'name': 'UA01',
      '$kuid': 'b782492e19',
      'label': [
        'Autonomous Republic of Crimea',
        'Автономна Республіка Крим',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA71',
      '$kuid': 'b0271b167d',
      'label': [
        'Cherkaska',
        'Черкаська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA74',
      '$kuid': 'a57e0a7f35',
      'label': [
        'Chernihivska',
        'Чернігівська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA73',
      '$kuid': '85ccabdcc8',
      'label': [
        'Chernivetska',
        'Чернівецька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA12',
      '$kuid': 'f3916970bb',
      'label': [
        'Dnipropetrovska',
        'Дніпропетровська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA14',
      '$kuid': '843eb37a06',
      'label': [
        'Donetska',
        'Донецька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA26',
      '$kuid': '54e33c614c',
      'label': [
        'Ivano-Frankivska',
        'Івано-Франківська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA63',
      '$kuid': 'dc6ea787b5',
      'label': [
        'Kharkivska',
        'Харківська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA65',
      '$kuid': '2f1084c3b1',
      'label': [
        'Khersonska',
        'Херсонська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA68',
      '$kuid': 'a1a0b43a9f',
      'label': [
        'Khmelnytska',
        'Хмельницька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA35',
      '$kuid': '2b09caf8b0',
      'label': [
        'Kirovohradska',
        'Кіровоградська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA80',
      '$kuid': 'a5caf4ae89',
      'label': [
        'Kyiv',
        'Київ',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA32',
      '$kuid': '34087b9523',
      'label': [
        'Kyivska',
        'Київська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA44',
      '$kuid': '0a3b43baa3',
      'label': [
        'Luhanska',
        'Луганська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA46',
      '$kuid': '0917f9de0c',
      'label': [
        'Lvivska',
        'Львівська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA48',
      '$kuid': '1571edc3c0',
      'label': [
        'Mykolaivska',
        'Миколаївська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA51',
      '$kuid': '887ade4a57',
      'label': [
        'Odeska',
        'Одеська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA53',
      '$kuid': '6c72879b13',
      'label': [
        'Poltavska',
        'Полтавська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA56',
      '$kuid': '1bef95ea5a',
      'label': [
        'Rivnenska',
        'Рівненська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA85',
      '$kuid': 'a0b499e7d6',
      'label': [
        'Sevastopol',
        'Севастополь',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA59',
      '$kuid': 'cdb2631dbc',
      'label': [
        'Sumska',
        'Сумська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA61',
      '$kuid': '0cdde87eb5',
      'label': [
        'Ternopilska',
        'Тернопільська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA05',
      '$kuid': '0be25ada18',
      'label': [
        'Vinnytska',
        'Вінницька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA07',
      '$kuid': 'a081e62ee2',
      'label': [
        'Volynska',
        'Волинська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA21',
      '$kuid': '844d5e037b',
      'label': [
        'Zakarpatska',
        'Закарпатська',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA23',
      '$kuid': '02fe8e839f',
      'label': [
        'Zaporizka',
        'Запорізька',
      ],
      'list_name': 'oblast',
    },
    {
      'name': 'UA18',
      '$kuid': '49d93f49a2',
      'label': [
        'Zhytomyrska',
        'Житомирська',
      ],
      'list_name': 'oblast',
    },
    {
      'tag': 'UA01',
      'name': 'UA0102',
      '$kuid': '0bbdd6477e',
      'label': [
        'Bakhchysaraiskyi',
        'Бахчисарайський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0104',
      '$kuid': 'b18522c96d',
      'label': [
        'Bilohirskyi',
        'Білогірський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0106',
      '$kuid': 'a743651e4b',
      'label': [
        'Dzhankoiskyi',
        'Джанкойський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0118',
      '$kuid': '7dfcb06c54',
      'label': [
        'Feodosiiskyi',
        'Феодосійський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0110',
      '$kuid': 'bae8a44f6a',
      'label': [
        'Kerchynskyi',
        'Керченський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0112',
      '$kuid': '8193bd597a',
      'label': [
        'Krasnohvardiiskyi',
        'Красногвардійський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0114',
      '$kuid': '727973b834',
      'label': [
        'Krasnoperekopskyi',
        'Красноперекопський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0116',
      '$kuid': '3694996c05',
      'label': [
        'Simferopolskyi',
        'Сімферопольський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0120',
      '$kuid': '420cfa2fd2',
      'label': [
        'Yaltynskyi',
        'Ялтинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA01',
      'name': 'UA0108',
      '$kuid': 'a71aa3679c',
      'label': [
        'Yevpatoriiskyi',
        'Євпаторійський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA71',
      'name': 'UA7108',
      '$kuid': 'd08f9bb7fe',
      'label': [
        'Cherkaskyi',
        'Черкаський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA71',
      'name': 'UA7106',
      '$kuid': '2daaed03db',
      'label': [
        'Umanskyi',
        'Уманський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA71',
      'name': 'UA7104',
      '$kuid': '9f466d2579',
      'label': [
        'Zolotoniskyi',
        'Золотоніський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA71',
      'name': 'UA7102',
      '$kuid': 'c581bf5094',
      'label': [
        'Zvenyhorodskyi',
        'Звенигородський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA74',
      'name': 'UA7410',
      '$kuid': '02a86b3f1e',
      'label': [
        'Chernihivskyi',
        'Чернігівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA74',
      'name': 'UA7402',
      '$kuid': 'a65c298118',
      'label': [
        'Koriukivskyi',
        'Корюківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA74',
      'name': 'UA7404',
      '$kuid': '5c24ee6c7b',
      'label': [
        'Nizhynskyi',
        'Ніжинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA74',
      'name': 'UA7406',
      '$kuid': 'df71a43580',
      'label': [
        'Novhorod-Siverskyi',
        'Новгород-Сіверський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA74',
      'name': 'UA7408',
      '$kuid': '7d61f7dd52',
      'label': [
        'Prylutskyi',
        'Прилуцький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA73',
      'name': 'UA7306',
      '$kuid': '19476c5670',
      'label': [
        'Chernivetskyi',
        'Чернівецький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA73',
      'name': 'UA7304',
      '$kuid': 'bf24435b28',
      'label': [
        'Dnistrovskyi',
        'Дністровський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA73',
      'name': 'UA7302',
      '$kuid': 'f919e76372',
      'label': [
        'Vyzhnytskyi',
        'Вижницький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1202',
      '$kuid': 'b613809e86',
      'label': [
        'Dniprovskyi',
        'Дніпровський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1204',
      '$kuid': '8409445478',
      'label': [
        'Kamianskyi',
        'Кам’янський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1206',
      '$kuid': '50dffe8dae',
      'label': [
        'Kryvorizkyi',
        'Криворізький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1208',
      '$kuid': '3346688ebc',
      'label': [
        'Nikopolskyi',
        'Нікопольський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1210',
      '$kuid': '9ef9f952b6',
      'label': [
        'Novomoskovskyi',
        'Новомосковський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1212',
      '$kuid': '516a707d0f',
      'label': [
        'Pavlohradskyi',
        'Павлоградський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA12',
      'name': 'UA1214',
      '$kuid': 'd55b18da74',
      'label': [
        'Synelnykivskyi',
        'Синельниківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1402',
      '$kuid': 'd4b5d9d1b3',
      'label': [
        'Bakhmutskyi',
        'Бахмутський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1408',
      '$kuid': '9ada612c2e',
      'label': [
        'Donetskyi',
        'Донецький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1406',
      '$kuid': '5b3648fff0',
      'label': [
        'Horlivskyi',
        'Горлівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1410',
      '$kuid': 'cc8229ad2d',
      'label': [
        'Kalmiuskyi',
        'Кальміуський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1412',
      '$kuid': 'f371c6b2e9',
      'label': [
        'Kramatorskyi',
        'Краматорський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1414',
      '$kuid': '1046e2118c',
      'label': [
        'Mariupolskyi',
        'Маріупольський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1416',
      '$kuid': '8bb6f53e73',
      'label': [
        'Pokrovskyi',
        'Покровський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA14',
      'name': 'UA1404',
      '$kuid': '7d3e722d31',
      'label': [
        'Volnovaskyi',
        'Волноваський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA26',
      'name': 'UA2604',
      '$kuid': '959d0df558',
      'label': [
        'Ivano-Frankivskyi',
        'Івано-Франківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA26',
      'name': 'UA2606',
      '$kuid': '42bdd70eba',
      'label': [
        'Kaluskyi',
        'Калуський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA26',
      'name': 'UA2608',
      '$kuid': '0005d55b3c',
      'label': [
        'Kolomyiskyi',
        'Коломийський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA26',
      'name': 'UA2610',
      '$kuid': '728f671f2a',
      'label': [
        'Kosivskyi',
        'Косівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA26',
      'name': 'UA2612',
      '$kuid': '3421386d4a',
      'label': [
        'Nadvirnianskyi',
        'Надвірнянський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA26',
      'name': 'UA2602',
      '$kuid': '8fd78be235',
      'label': [
        'Verkhovynskyi',
        'Верховинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6302',
      '$kuid': '2cbf231a4e',
      'label': [
        'Bohodukhivskyi',
        'Богодухівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6314',
      '$kuid': 'f3293b64a1',
      'label': [
        'Chuhuivskyi',
        'Чугуївський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6304',
      '$kuid': 'd609348542',
      'label': [
        'Iziumskyi',
        'Ізюмський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6312',
      '$kuid': '94941e508b',
      'label': [
        'Kharkivskyi',
        'Харківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6306',
      '$kuid': '76a9cdeeb2',
      'label': [
        'Krasnohradskyi',
        'Красноградський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6308',
      '$kuid': '287d063792',
      'label': [
        'Kupianskyi',
        'Куп\'янський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA63',
      'name': 'UA6310',
      '$kuid': '5f2d44dbc7',
      'label': [
        'Lozivskyi',
        'Лозівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA65',
      'name': 'UA6502',
      '$kuid': 'fe2d55742d',
      'label': [
        'Beryslavskyi',
        'Бериславський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA65',
      'name': 'UA6504',
      '$kuid': '8800596c02',
      'label': [
        'Henicheskyi',
        'Генічеський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA65',
      'name': 'UA6506',
      '$kuid': 'df66ca71b6',
      'label': [
        'Kakhovskyi',
        'Каховський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA65',
      'name': 'UA6510',
      '$kuid': '20328bdd00',
      'label': [
        'Khersonskyi',
        'Херсонський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA65',
      'name': 'UA6508',
      '$kuid': '4ed71e5da1',
      'label': [
        'Skadovskyi',
        'Скадовський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA68',
      'name': 'UA6802',
      '$kuid': '7a26f8c7bb',
      'label': [
        'Kamianets-Podilskyi',
        'Кам\'янець-Подільський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA68',
      'name': 'UA6804',
      '$kuid': '6ad68b4ebe',
      'label': [
        'Khmelnytskyi',
        'Хмельницький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA68',
      'name': 'UA6806',
      '$kuid': 'f8c34a6398',
      'label': [
        'Shepetivskyi',
        'Шепетівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA35',
      'name': 'UA3502',
      '$kuid': '9d85c0b8e4',
      'label': [
        'Holovanivskyi',
        'Голованівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA35',
      'name': 'UA3504',
      '$kuid': 'b2bbe7bba6',
      'label': [
        'Kropyvnytskyi',
        'Кропивницький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA35',
      'name': 'UA3506',
      '$kuid': '908fb801df',
      'label': [
        'Novoukrainskyi',
        'Новоукраїнський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA35',
      'name': 'UA3508',
      '$kuid': '6c04575212',
      'label': [
        'Oleksandriiskyi',
        'Олександрійський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA80',
      'name': 'UA8000',
      '$kuid': '8068897e5b',
      'label': [
        'Kyiv',
        'Київ',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3202',
      '$kuid': 'ab32e32ce1',
      'label': [
        'Bilotserkivskyi',
        'Білоцерківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3204',
      '$kuid': 'f02476a15e',
      'label': [
        'Boryspilskyi',
        'Бориспільський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3206',
      '$kuid': '79479fd566',
      'label': [
        'Brovarskyi',
        'Броварський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3208',
      '$kuid': 'aabbc18c9c',
      'label': [
        'Buchanskyi',
        'Бучанський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3200',
      '$kuid': '2ebee8bb59',
      'label': [
        'Chornobyl Exclusion Zone',
        'Чорнобильська зона відчуження',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3214',
      '$kuid': 'c82d88f545',
      'label': [
        'Fastivskyi',
        'Фастівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3212',
      '$kuid': '2d06d0611d',
      'label': [
        'Obukhivskyi',
        'Обухівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA32',
      'name': 'UA3210',
      '$kuid': '4c4be60dfc',
      'label': [
        'Vyshhorodskyi',
        'Вишгородський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4402',
      '$kuid': '638080980e',
      'label': [
        'Alchevskyi',
        'Алчевський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4404',
      '$kuid': '12a96d15bb',
      'label': [
        'Dovzhanskyi',
        'Довжанський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4406',
      '$kuid': '21c4b58ba3',
      'label': [
        'Luhanskyi',
        'Луганський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4408',
      '$kuid': '028a660155',
      'label': [
        'Rovenkivskyi',
        'Ровеньківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4416',
      '$kuid': '5cb7c01f23',
      'label': [
        'Shchastynskyi',
        'Щастинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4412',
      '$kuid': '130d3447d6',
      'label': [
        'Sievierodonetskyi',
        'Сєвєродонецький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4414',
      '$kuid': 'ad0620ce1f',
      'label': [
        'Starobilskyi',
        'Старобільський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA44',
      'name': 'UA4410',
      '$kuid': '5c2488614c',
      'label': [
        'Svativskyi',
        'Сватівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4612',
      '$kuid': '80d7bf5c5c',
      'label': [
        'Chervonohradskyi',
        'Червоноградський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4602',
      '$kuid': '1d5494540b',
      'label': [
        'Drohobytskyi',
        'Дрогобицький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4606',
      '$kuid': 'a8e18bb1b1',
      'label': [
        'Lvivskyi',
        'Львівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4608',
      '$kuid': '3af03cbbca',
      'label': [
        'Sambirskyi',
        'Самбірський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4610',
      '$kuid': '9b3f178890',
      'label': [
        'Stryiskyi',
        'Стрийський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4614',
      '$kuid': 'b1bfa46a4c',
      'label': [
        'Yavorivskyi',
        'Яворівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA46',
      'name': 'UA4604',
      '$kuid': 'cba311dec6',
      'label': [
        'Zolochivskyi',
        'Золочівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA48',
      'name': 'UA4802',
      '$kuid': '84c1e99c93',
      'label': [
        'Bashtanskyi',
        'Баштанський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA48',
      'name': 'UA4806',
      '$kuid': 'a9c2d31b85',
      'label': [
        'Mykolaivskyi',
        'Миколаївський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA48',
      'name': 'UA4808',
      '$kuid': '7d93fe6a24',
      'label': [
        'Pervomaiskyi',
        'Первомайський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA48',
      'name': 'UA4804',
      '$kuid': '971a130cd0',
      'label': [
        'Voznesenskyi',
        'Вознесенський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5102',
      '$kuid': 'db27de6691',
      'label': [
        'Berezivskyi',
        'Березівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5104',
      '$kuid': 'd22bd874d0',
      'label': [
        'Bilhorod-Dnistrovskyi',
        'Білгород-Дністровський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5106',
      '$kuid': '926ee0607c',
      'label': [
        'Bolhradskyi',
        'Болградський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5108',
      '$kuid': 'a1fc9f1173',
      'label': [
        'Izmailskyi',
        'Ізмаїльський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5110',
      '$kuid': 'a1648e627d',
      'label': [
        'Odeskyi',
        'Одеський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5112',
      '$kuid': '9ab620c7fa',
      'label': [
        'Podilskyi',
        'Подільський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA51',
      'name': 'UA5114',
      '$kuid': '189290d307',
      'label': [
        'Rozdilnianskyi',
        'Роздільнянський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA53',
      'name': 'UA5302',
      '$kuid': '84657cb698',
      'label': [
        'Kremenchutskyi',
        'Кременчуцький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA53',
      'name': 'UA5304',
      '$kuid': '06201e1193',
      'label': [
        'Lubenskyi',
        'Лубенський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA53',
      'name': 'UA5306',
      '$kuid': '3639990145',
      'label': [
        'Myrhorodskyi',
        'Миргородський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA53',
      'name': 'UA5308',
      '$kuid': '9823b24e95',
      'label': [
        'Poltavskyi',
        'Полтавський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA56',
      'name': 'UA5604',
      '$kuid': 'f3f3001f0f',
      'label': [
        'Dubenskyi',
        'Дубенський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA56',
      'name': 'UA5606',
      '$kuid': '7ad8158768',
      'label': [
        'Rivnenskyi',
        'Рівненський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA56',
      'name': 'UA5608',
      '$kuid': '0709f00c29',
      'label': [
        'Sarnenskyi',
        'Сарненський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA56',
      'name': 'UA5602',
      '$kuid': 'cf782217b7',
      'label': [
        'Varaskyi',
        'Вараський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA85',
      'name': 'UA8500',
      '$kuid': '90d795b6ca',
      'label': [
        'Sevastopol',
        'Севастополь',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA59',
      'name': 'UA5902',
      '$kuid': 'a2a46659a1',
      'label': [
        'Konotopskyi',
        'Конотопський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA59',
      'name': 'UA5904',
      '$kuid': '509cd35021',
      'label': [
        'Okhtyrskyi',
        'Охтирський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA59',
      'name': 'UA5906',
      '$kuid': 'faf6c1b9e1',
      'label': [
        'Romenskyi',
        'Роменський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA59',
      'name': 'UA5910',
      '$kuid': '5c01ea5bba',
      'label': [
        'Shostkynskyi',
        'Шосткинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA59',
      'name': 'UA5908',
      '$kuid': '0e2d337604',
      'label': [
        'Sumskyi',
        'Сумський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA61',
      'name': 'UA6106',
      '$kuid': '59aff21c48',
      'label': [
        'Chortkivskyi',
        'Чортківський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA61',
      'name': 'UA6102',
      '$kuid': '64bf115349',
      'label': [
        'Kremenetskyi',
        'Кременецький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA61',
      'name': 'UA6104',
      '$kuid': 'ea923c75df',
      'label': [
        'Ternopilskyi',
        'Тернопільський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA05',
      'name': 'UA0504',
      '$kuid': '8ee934d008',
      'label': [
        'Haisynskyi',
        'Гайсинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA05',
      'name': 'UA0512',
      '$kuid': '4061f81a41',
      'label': [
        'Khmilnytskyi',
        'Хмільницький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA05',
      'name': 'UA0508',
      '$kuid': '2c2760c15e',
      'label': [
        'Mohyliv-Podilskyi',
        'Могилів-Подільський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA05',
      'name': 'UA0510',
      '$kuid': '13b3205e7e',
      'label': [
        'Tulchynskyi',
        'Тульчинський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA05',
      'name': 'UA0502',
      '$kuid': '262f4de9ce',
      'label': [
        'Vinnytskyi',
        'Вінницький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA05',
      'name': 'UA0506',
      '$kuid': '6f7bfa418a',
      'label': [
        'Zhmerynskyi',
        'Жмеринський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA07',
      'name': 'UA0704',
      '$kuid': 'd5fa560267',
      'label': [
        'Kamin-Kashyrskyi',
        'Камінь-Каширський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA07',
      'name': 'UA0706',
      '$kuid': 'd5e72051da',
      'label': [
        'Kovelskyi',
        'Ковельський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA07',
      'name': 'UA0708',
      '$kuid': 'c23d230971',
      'label': [
        'Lutskyi',
        'Луцький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA07',
      'name': 'UA0702',
      '$kuid': '1080318818',
      'label': [
        'Volodymyrskyi',
        'Володимирський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA21',
      'name': 'UA2102',
      '$kuid': 'd9f533c133',
      'label': [
        'Berehivskyi',
        'Берегівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA21',
      'name': 'UA2112',
      '$kuid': '738a188d75',
      'label': [
        'Khustskyi',
        'Хустський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA21',
      'name': 'UA2104',
      '$kuid': 'ce2946d9c4',
      'label': [
        'Mukachivskyi',
        'Мукачівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA21',
      'name': 'UA2106',
      '$kuid': '6aa778702a',
      'label': [
        'Rakhivskyi',
        'Рахівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA21',
      'name': 'UA2108',
      '$kuid': '4901471c82',
      'label': [
        'Tiachivskyi',
        'Тячівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA21',
      'name': 'UA2110',
      '$kuid': '8f55b2d5aa',
      'label': [
        'Uzhhorodskyi',
        'Ужгородський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA23',
      'name': 'UA2302',
      '$kuid': 'ba8191c43a',
      'label': [
        'Berdianskyi',
        'Бердянський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA23',
      'name': 'UA2308',
      '$kuid': '34624d9f88',
      'label': [
        'Melitopolskyi',
        'Мелітопольський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA23',
      'name': 'UA2310',
      '$kuid': '558445c635',
      'label': [
        'Polohivskyi',
        'Пологівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA23',
      'name': 'UA2304',
      '$kuid': '55981721db',
      'label': [
        'Vasylivskyi',
        'Василівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA23',
      'name': 'UA2306',
      '$kuid': '1b79d953cd',
      'label': [
        'Zaporizkyi',
        'Запорізький',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA18',
      'name': 'UA1802',
      '$kuid': 'bfb849b4f9',
      'label': [
        'Berdychivskyi',
        'Бердичівський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA18',
      'name': 'UA1806',
      '$kuid': '4656a12872',
      'label': [
        'Korostenskyi',
        'Коростенський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA18',
      'name': 'UA1804',
      '$kuid': 'b839806012',
      'label': [
        'Zhytomyrskyi',
        'Житомирський',
      ],
      'list_name': 'raion',
    },
    {
      'tag': 'UA18',
      'name': 'UA1808',
      '$kuid': '79baf732a3',
      'label': [
        'Zviahelskyi',
        'Звягельський',
      ],
      'list_name': 'raion',
    },
    {
      'name': 'russian_masculine',
      '$kuid': 'd4ea17a2d0',
      'label': [
        'Russian',
        'Російський',
      ],
      'list_name': 'citizen_foreign',
    },
    {
      'name': 'country_of_origin_azerbaijan',
      '$kuid': '6074999116',
      'label': [
        'Azerbaijani',
        'Азербайджан',
      ],
      'list_name': 'citizen_foreign',
    },
    {
      'name': 'country_of_origin_moldovan',
      '$kuid': '95463cf63a',
      'label': [
        'Moldovan',
        'Молдова',
      ],
      'list_name': 'citizen_foreign',
    },
    {
      'name': 'country_of_origin_romanian',
      '$kuid': 'eeb73750ed',
      'label': [
        'Romanian',
        'Румунія',
      ],
      'list_name': 'citizen_foreign',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '2825b51c62',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'citizen_foreign',
    },
    {
      'name': 'other_specify',
      '$kuid': '0cf095e0dd',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'citizen_foreign',
    },
    {
      'name': 'one_person_household',
      '$kuid': '300ca3e134',
      'label': [
        'One person household (any person living alone)',
        'Домогосподарство з однією особою (будь-яка самотня особа)',
      ],
      'list_name': 'household_type',
    },
    {
      'name': 'couple_without_children',
      '$kuid': '0b0f9ce82a',
      'label': [
        'Couple without children (2 members)',
        'Пара без дітей (2 члени)',
      ],
      'list_name': 'household_type',
    },
    {
      'name': 'couple_with_children',
      '$kuid': '1371f833c4',
      'label': [
        'Couple with children (3+ members)',
        'Пара з дітьми (3+ члени)',
      ],
      'list_name': 'household_type',
    },
    {
      'name': 'mother_with_children',
      '$kuid': '053df31a6d',
      'label': [
        'Mother with children (2+ members)',
        'Мати з дітьми (2+ члени)',
      ],
      'list_name': 'household_type',
    },
    {
      'name': 'father_with_children',
      '$kuid': 'ae3bd07fda',
      'label': [
        'Father with children (2+ members)',
        'Батько з дітьми (2+ члени)',
      ],
      'list_name': 'household_type',
    },
    {
      'name': 'extended_family',
      '$kuid': 'daac405ef8',
      'label': [
        'Extended family (2+ members – may contain partners, children and any other familial relative but must not include any extra-familial members)',
        'Розширена сім \'я (2+ члени – може містити партнерів, дітей та будь-яких інших сімейних родичів, але не має включати будь-яких позасімейних членів)',
      ],
      'list_name': 'household_type',
    },
    {
      'name': 'male',
      '$kuid': 'b526f4b8f7',
      'label': [
        'Male',
        'Чоловік',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'female',
      '$kuid': '154e7e1454',
      'label': [
        'Female',
        'Жінка',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'other',
      '$kuid': 'c0b757ce26',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '1b469883bd',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'gender',
    },
    {
      'name': 'no',
      '$kuid': '9928854956',
      'label': [
        'No',
        'Hi',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_see',
      '$kuid': '616c364fec',
      'label': [
        'Seeing, even if wearing glasses',
        'Зір, навіть якщо в окулярах',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_hear',
      '$kuid': '413d786514',
      'label': [
        'Hearing, even if using a hearing aid',
        'Слух, навіть якщо зі слуховим апаратом',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_walk',
      '$kuid': 'f6aa76c390',
      'label': [
        'Walking or climbing steps',
        'Ходьба або сходження по сходах',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_rem',
      '$kuid': 'a57dbd48e7',
      'label': [
        'Remembering or concentrating',
        'Пам\'ять або концентрація',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_care',
      '$kuid': '6e3fa6e562',
      'label': [
        'Self-care, such as washing all over or dressing',
        'Догляд за собою, наприклад миття тіла або одягання',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_comm',
      '$kuid': '4a21ce18e0',
      'label': [
        'Using your usual (customary) language, have difficulty communicating, for example understanding or being understood?',
        'Використання звичної (звичайної) мови, виникають труднощі у спілкуванні, наприклад, з розумінням або з можливістю бути зрозумілим?',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'diff_none',
      '$kuid': '3a3387d826',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'disability',
    },
    {
      'name': 'name',
      '$kuid': '5345278f14',
      'label': [
        'label::en',
        'label::uk',
      ],
      'list_name': 'list_name',
    },
    {
      'name': 'yes',
      '$kuid': 'f09d26211a',
      'label': [
        'Yes',
        'Так',
      ],
      'list_name': 'yn',
    },
    {
      'name': 'no',
      '$kuid': '3f4704f6eb',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'yn',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '0011f049df',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'yn',
    },
    {
      'name': 'partner',
      '$kuid': 'eb779eaf00',
      'label': [
        'Partner',
        'Партнер',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'child_lt_18',
      '$kuid': '822aed1b9f',
      'label': [
        'Child (<18)',
        'Дитина (<18)',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'child_gte_18',
      '$kuid': 'd6f692a979',
      'label': [
        'Child (≥18)',
        'Дитина (≥18)',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'mother',
      '$kuid': 'af92b777d5',
      'label': [
        'Mother',
        'Мати',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'father',
      '$kuid': '4233f3ca76',
      'label': [
        'Father',
        'Батько',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'caregiver',
      '$kuid': '6ecf5f53d6',
      'label': [
        'Caregiver',
        'Опікун',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'other',
      '$kuid': '099960ec46',
      'label': [
        'Other relative',
        'Інший родич',
      ],
      'list_name': 'relative',
    },
    {
      'name': 'with_respondent',
      '$kuid': '56cbbf31d0',
      'label': [
        'With respondent',
        'З респондентом',
      ],
      'list_name': 'location',
    },
    {
      'name': 'area_of_origin',
      '$kuid': '758a02236f',
      'label': [
        'Area of origin',
        'Район походження',
      ],
      'list_name': 'location',
    },
    {
      'name': 'elsewhere_country',
      '$kuid': 'efdea905d4',
      'label': [
        'Elsewhere in the',
        'В іншому місці країни',
      ],
      'list_name': 'location',
    },
    {
      'name': 'abroad',
      '$kuid': '84a8fc92c3',
      'label': [
        'Abroad',
        'За кордоном',
      ],
      'list_name': 'location',
    },
    {
      'name': 'unknown',
      '$kuid': 'd48ab652e4',
      'label': [
        'Unknown',
        'Невідомо',
      ],
      'list_name': 'location',
    },
    {
      'name': 'other',
      '$kuid': '2b37991988',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'location',
    },
    {
      'name': 'security',
      '$kuid': 'd751561edd',
      'label': [
        'Security situation',
        'Безпекова ситуація',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'health',
      '$kuid': '5044715acb',
      'label': [
        'Health reasons',
        'Причини здоров’я',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'work',
      '$kuid': '2b3ead4ee7',
      'label': [
        'Work or livelihood',
        'Робота / засоби існування',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'caregiving',
      '$kuid': '07aceb976a',
      'label': [
        'Caring for others',
        'Догляд за іншими',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'documentation',
      '$kuid': 'cd5c18ff20',
      'label': [
        'Lack of documents',
        'Відсутність документів',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'travel_restrictions',
      '$kuid': '0f08166c39',
      'label': [
        'Movement / travel restrictions',
        'Обмеження пересування',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'other',
      '$kuid': 'c8b81a3dfd',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'reason',
    },
    {
      'name': 'idp',
      '$kuid': '9ac418f016',
      'label': [
        'Internally Displaced Person (IDP)',
        'Внутрішньо переміщена особа',
      ],
      'list_name': 'disp_status',
    },
    {
      'tag': 'що повернулася',
      'name': 'returnee',
      '$kuid': 'ec7f3ad9fa',
      'label': [
        'Returnee',
        'Особа',
      ],
      'list_name': 'disp_status',
    },
    {
      'name': 'non_displaced',
      '$kuid': '67acbd2180',
      'label': [
        'Non-displaced',
        'Не переміщувався',
      ],
      'list_name': 'disp_status',
    },
    {
      'name': 'recent',
      '$kuid': '99f83eadb4',
      'label': [
        'Recently returned',
        'Нещодавно повернувся',
      ],
      'list_name': 'returnee_type',
    },
    {
      'name': 'long_term',
      '$kuid': '317f61173e',
      'label': [
        'Returned long ago',
        'Повернувся давно',
      ],
      'list_name': 'returnee_type',
    },
    {
      'name': 'insecurity',
      '$kuid': '3e2a83868d',
      'label': [
        'Insecurity / conflict',
        'Небезпека / конфлікт',
      ],
      'list_name': 'leave_reason',
    },
    {
      'name': 'housing_damage',
      '$kuid': 'a43679f4d6',
      'label': [
        'Housing damaged or destroyed',
        'Житло пошкоджене або зруйноване',
      ],
      'list_name': 'leave_reason',
    },
    {
      'name': 'lack_services',
      '$kuid': '17df84d072',
      'label': [
        'Lack of basic services',
        'Відсутність базових послуг',
      ],
      'list_name': 'leave_reason',
    },
    {
      'name': 'livelihoods',
      '$kuid': '6a59db19a7',
      'label': [
        'Lack of livelihoods',
        'Відсутність засобів до існування',
      ],
      'list_name': 'leave_reason',
    },
    {
      'name': 'family',
      '$kuid': 'b4f387ee49',
      'label': [
        'Family reunification',
        'Возз’єднання з родиною',
      ],
      'list_name': 'leave_reason',
    },
    {
      'name': 'other',
      '$kuid': '074065f840',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'leave_reason',
    },
    {
      'name': 'own_vehicle',
      '$kuid': '9e962a0e02',
      'label': [
        'Own vehicle',
        'Власний транспорт',
      ],
      'list_name': 'travel_mode',
    },
    {
      'name': 'public_transport',
      '$kuid': 'c2fc5f685f',
      'label': [
        'Public transport',
        'Громадський транспорт',
      ],
      'list_name': 'travel_mode',
    },
    {
      'name': 'humanitarian_transport',
      '$kuid': 'a9f503e5ed',
      'label': [
        'Humanitarian transport',
        'Гуманітарний транспорт',
      ],
      'list_name': 'travel_mode',
    },
    {
      'name': 'walking',
      '$kuid': 'e9793c459c',
      'label': [
        'On foot',
        'Пішки',
      ],
      'list_name': 'travel_mode',
    },
    {
      'name': 'other',
      '$kuid': 'a202b093c2',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'travel_mode',
    },
    {
      'name': 'improved_security',
      '$kuid': 'f59eddb65f',
      'label': [
        'Improved security',
        'Покращення безпеки',
      ],
      'list_name': 'return_reason',
    },
    {
      'name': 'housing_repaired',
      '$kuid': '6d34b372b9',
      'label': [
        'Housing repaired or compensated',
        'Житло відремонтоване або компенсоване',
      ],
      'list_name': 'return_reason',
    },
    {
      'name': 'services_restored',
      '$kuid': 'e729dd0ccc',
      'label': [
        'Services restored',
        'Відновлення послуг',
      ],
      'list_name': 'return_reason',
    },
    {
      'name': 'livelihoods',
      '$kuid': 'b3b17a4648',
      'label': [
        'Livelihood opportunities',
        'Можливості заробітку',
      ],
      'list_name': 'return_reason',
    },
    {
      'name': 'family',
      '$kuid': 'cbf53eab06',
      'label': [
        'Family reasons',
        'Сімейні причини',
      ],
      'list_name': 'return_reason',
    },
    {
      'name': 'other',
      '$kuid': '819f2aa454',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'return_reason',
    },
    {
      'name': 'yes',
      '$kuid': '5ddb2b9a53',
      'label': [
        'Yes',
        'Так',
      ],
      'list_name': 'compensation',
    },
    {
      'name': 'no',
      '$kuid': '7a081f3bc0',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'compensation',
    },
    {
      'name': 'unknown',
      '$kuid': '4db14b230c',
      'label': [
        'Do not know / prefer not to say',
        'Важко сказати / не бажаю відповідати',
      ],
      'list_name': 'compensation',
    },
    {
      'name': 'stay',
      '$kuid': '2c2010a915',
      'label': [
        'Stay in current location',
        'Залишитися на поточному місці',
      ],
      'list_name': 'intentions',
    },
    {
      'name': 'integrate',
      '$kuid': '50ebcfb745',
      'label': [
        'Integrate locally',
        'Інтегруватися локально',
      ],
      'list_name': 'intentions',
    },
    {
      'name': 'return_origin',
      '$kuid': '9b9891d591',
      'label': [
        'Return to place of origin',
        'Повернутися до місця походження',
      ],
      'list_name': 'intentions',
    },
    {
      'name': 'relocate_ukraine',
      '$kuid': 'b9c25a4baa',
      'label': [
        'Relocate elsewhere in Ukraine',
        'Переїхати в інший регіон України',
      ],
      'list_name': 'intentions',
    },
    {
      'name': 'relocate_abroad',
      '$kuid': '6954a1c2e6',
      'label': [
        'Relocate outside Ukraine',
        'Переїхати за межі України',
      ],
      'list_name': 'intentions',
    },
    {
      'name': 'housing',
      '$kuid': '258e46803b',
      'label': [
        'Housing support',
        'Підтримка з житлом',
      ],
      'list_name': 'integrate_needs',
    },
    {
      'name': 'jobs',
      '$kuid': '9e5983d3b1',
      'label': [
        'Employment opportunities',
        'Можливості працевлаштування',
      ],
      'list_name': 'integrate_needs',
    },
    {
      'name': 'services',
      '$kuid': 'bcb9d02ad5',
      'label': [
        'Access to services',
        'Доступ до послуг',
      ],
      'list_name': 'integrate_needs',
    },
    {
      'name': 'social',
      '$kuid': 'ffce33d916',
      'label': [
        'Social integration',
        'Соціальна інтеграція',
      ],
      'list_name': 'integrate_needs',
    },
    {
      'name': 'legal',
      '$kuid': 'abf73915b9',
      'label': [
        'Legal assistance',
        'Юридична допомога',
      ],
      'list_name': 'integrate_needs',
    },
    {
      'name': 'other',
      '$kuid': '414617dc40',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'integrate_needs',
    },
    {
      'name': 'security',
      '$kuid': '38f1b8ecbc',
      'label': [
        'Improved security situation',
        'Покращення безпеки',
      ],
      'list_name': 'return_conditions',
    },
    {
      'name': 'housing',
      '$kuid': '3ecf500099',
      'label': [
        'Repaired housing',
        'Відновлене житло',
      ],
      'list_name': 'return_conditions',
    },
    {
      'name': 'services',
      '$kuid': '1c49dc6037',
      'label': [
        'Restored services',
        'Відновлення послуг',
      ],
      'list_name': 'return_conditions',
    },
    {
      'name': 'livelihoods',
      '$kuid': '9e344f0f4e',
      'label': [
        'Access to livelihoods',
        'Доступ до засобів до існування',
      ],
      'list_name': 'return_conditions',
    },
    {
      'name': 'insecurity',
      '$kuid': 'edf8b4c6ff',
      'label': [
        'Insecurity',
        'Небезпека',
      ],
      'list_name': 'relocate_reason',
    },
    {
      'name': 'housing',
      '$kuid': '7e8f1815d8',
      'label': [
        'Housing issues',
        'Проблеми з житлом',
      ],
      'list_name': 'relocate_reason',
    },
    {
      'name': 'services',
      '$kuid': '05ead6ee40',
      'label': [
        'Lack of services',
        'Відсутність послуг',
      ],
      'list_name': 'relocate_reason',
    },
    {
      'name': 'livelihoods',
      '$kuid': '0d20ab8702',
      'label': [
        'Lack of livelihoods',
        'Відсутність роботи',
      ],
      'list_name': 'relocate_reason',
    },
    {
      'name': 'family',
      '$kuid': 'dca7c4406b',
      'label': [
        'Family reasons',
        'Сімейні причини',
      ],
      'list_name': 'relocate_reason',
    },
    {
      'name': 'other',
      '$kuid': 'aa2555542a',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'relocate_reason',
    },
    {
      'name': 'yes_refugee_status',
      '$kuid': '7bf6aed5fc',
      'label': [
        'Refugee or protection status',
        'Статус біженця або захисту',
      ],
      'list_name': 'non_ua_docs',
    },
    {
      'name': 'yes_asylum_request_registrated',
      '$kuid': 'd01465e9bc',
      'label': [
        'Asylum request registered',
        'Зареєстрований запит на притулок',
      ],
      'list_name': 'non_ua_docs',
    },
    {
      'name': 'yes_residence_permit',
      '$kuid': '0f960e0f91',
      'label': [
        'Residence permit',
        'Посвідка на проживання',
      ],
      'list_name': 'non_ua_docs',
    },
    {
      'name': 'no',
      '$kuid': '30965fc16d',
      'label': [
        'No documentation',
        'Немає документів',
      ],
      'list_name': 'non_ua_docs',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '2c5bf6cce5',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'non_ua_docs',
    },
    {
      'name': 'yes',
      '$kuid': '3a5e0f5885',
      'label': [
        'Yes',
        'Так',
      ],
      'list_name': 'stateless_cert',
    },
    {
      'name': 'no',
      '$kuid': 'd9253eaae0',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'stateless_cert',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '3657c67e8d',
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
      '$kuid': '4185111c80',
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
      '$kuid': 'bc8890756d',
      'label': [
        'No',
        'some members not registered',
      ],
      'list_name': 'idp_registered',
    },
    {
      'name': 'none',
      '$kuid': '623247a301',
      'label': [
        'None registered',
        'Ніхто не зареєстрований',
      ],
      'list_name': 'idp_registered',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '966eba4e4d',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'idp_registered',
    },
    {
      'name': 'yes',
      '$kuid': '4ef71101db',
      'label': [
        'Yes',
        'Так',
      ],
      'list_name': 'member_registered',
    },
    {
      'name': 'no',
      '$kuid': '80e9c91b4a',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'member_registered',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '02243c8f50',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'member_registered',
    },
    {
      'name': 'birth_certificate',
      '$kuid': '32d42ebea2',
      'label': [
        'Birth certificate',
        'Свідоцтво про народження',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'tin',
      '$kuid': 'f57ff8a268',
      'label': [
        'TIN – tax identification number',
        'ІПН – податковий номер',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'pensioner_cert_social',
      '$kuid': '60e65a452a',
      'label': [
        'Pensioner certificate (social)',
        'Пенсійне посвідчення (соціальне)',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'pensioner_cert_retirement',
      '$kuid': 'f2b7090cd0',
      'label': [
        'Pensioner certificate (retirement)',
        'Пенсійне посвідчення (пенсійне)',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'passport',
      '$kuid': '5c647029ca',
      'label': [
        'National passport',
        'Національний паспорт',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'none',
      '$kuid': 'c5c8d977c0',
      'label': [
        'None',
        'Жодного',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '6f24413784',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'other_specify',
      '$kuid': 'a43901e9eb',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'missing_doc',
    },
    {
      'name': 'idp_certificate',
      '$kuid': '46e5aa542d',
      'label': [
        'IDP certificate (paper-based)',
        'Довідка ВПО (у паперовому вигляді)',
      ],
      'list_name': 'idp_docs',
    },
    {
      'name': 'idp_eregistration',
      '$kuid': '6345db9df9',
      'label': [
        'IDP e-registration',
        'Електронна реєстрація ВПО',
      ],
      'list_name': 'idp_docs',
    },
    {
      'name': 'no_proof_of_registration',
      '$kuid': '4b9e1687fb',
      'label': [
        'No proof of registration',
        'Немає підтвердження реєстрації',
      ],
      'list_name': 'idp_docs',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '84673d568c',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'idp_docs',
    },
    {
      'name': 'yes',
      '$kuid': 'fba6c7fdba',
      'label': [
        'Yes',
        'Так',
      ],
      'list_name': 'idp_allowance',
    },
    {
      'name': 'no',
      '$kuid': '92995834e3',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'idp_allowance',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'b8f9a46eb1',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'idp_allowance',
    },
    {
      'name': 'delays_in_allowances_payment',
      '$kuid': '83455cadf2',
      'label': [
        'Delays in allowance payment',
        'Затримки виплати допомоги',
      ],
      'list_name': 'no_allowance_reason',
    },
    {
      'name': 'change_of_place_of_residence',
      '$kuid': 'a6960420db',
      'label': [
        'Change of place of residence',
        'Зміна місця проживання',
      ],
      'list_name': 'no_allowance_reason',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '3938c091a9',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'no_allowance_reason',
    },
    {
      'name': 'other_specify',
      '$kuid': 'c99886e7d0',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'no_allowance_reason',
    },
    {
      'name': 'registration_was_rejected',
      '$kuid': '6d8c77a1be',
      'label': [
        'Registration was rejected',
        'Реєстрацію відхилено',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'delays_in_registration_process',
      '$kuid': '750c06f411',
      'label': [
        'Delays in registration process',
        'Затримки в процесі реєстрації',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'unaware_of_registration_process',
      '$kuid': '06fcebc830',
      'label': [
        'Unaware of the registration process',
        'Не обізнаний з процесом реєстрації',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'unable_to_access_registration_center',
      '$kuid': '3dd5198dcf',
      'label': [
        'Unable to access registration center',
        'Неможливо отримати доступ до центру реєстрації',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'costly_process',
      '$kuid': '2536e1bd56',
      'label': [
        'Costly process',
        'Витратний процес',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'not_entitled_to_register_as_an_idp',
      '$kuid': '668afc0aef',
      'label': [
        'Not entitled to register as IDP',
        'Немає права реєструватися як ВПО',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'fear_of_conscription',
      '$kuid': 'ad1e3fa969',
      'label': [
        'Fear of conscription',
        'Страх призову',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'lack_of_required_documentation',
      '$kuid': '9ec08ed581',
      'label': [
        'Lack of required documentation',
        'Відсутність необхідних документів',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '9461f766a0',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'other_specify',
      '$kuid': 'bb1661ef1c',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'not_registered_reason',
    },
    {
      'name': 'multiple_displacements',
      '$kuid': '0febe9deb6',
      'label': [
        'Multiple displacements',
        'Багаторазові переміщення',
      ],
      'list_name': 'rejected_reason',
    },
    {
      'name': 'lack_of_personal_documentation',
      '$kuid': 'd69748b115',
      'label': [
        'Lack of personal documentation',
        'Відсутність особистих документів',
      ],
      'list_name': 'rejected_reason',
    },
    {
      'name': 'area_not_eligible',
      '$kuid': '9eda9ee2d5',
      'label': [
        'Area of displacement not eligible for IDP registration',
        'Територія переміщення не підпадає під критерії реєстрації ВПО',
      ],
      'list_name': 'rejected_reason',
    },
    {
      'name': 'area_too_close_to_origin',
      '$kuid': '0a2d30c092',
      'label': [
        'Displacement area too close to place of origin',
        'Район переміщення занадто близький до місця походження',
      ],
      'list_name': 'rejected_reason',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'a542554cc6',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'rejected_reason',
    },
    {
      'name': 'other_specify',
      '$kuid': '0109de1094',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'rejected_reason',
    },
    {
      'name': 'none',
      '$kuid': '0bd2953e90',
      'label': [
        'None',
        'Жодного',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'property_ownership_for_apartment_house',
      '$kuid': '16cfe39ae4',
      'label': [
        'Property ownership for apartment/house',
        'Право власності на квартиру/будинок',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'property_ownership_certificate_for_land',
      '$kuid': 'ff8c8d2bb4',
      'label': [
        'Property ownership certificate for land',
        'Свідоцтво про право власності на землю',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'lease_agreement_for_house_apartment',
      '$kuid': '99a548f454',
      'label': [
        'Lease agreement for house/apartment',
        'Договір оренди будинку/квартири',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'bti_certificate',
      '$kuid': 'c28ef162e8',
      'label': [
        'BTI certificate',
        'Довідка БТІ',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'inheritance_certificate',
      '$kuid': '4ec498310f',
      'label': [
        'Inheritance certificate',
        'Свідоцтво про право на спадщину',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'death_certificate_of_predecessor',
      '$kuid': '87a98580c3',
      'label': [
        'Death certificate of predecessor',
        'Свідоцтво про смерть попередника',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '43e74464b8',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'other_specify',
      '$kuid': '571b7385db',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'hlp_missing',
    },
    {
      'name': 'length_of_administrative_procedures',
      '$kuid': 'f37edc3a94',
      'label': [
        'Length of administrative procedures',
        'Тривалість адміністративних процедур',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'cost_of_administrative_procedures',
      '$kuid': '288f91d769',
      'label': [
        'Cost of administrative procedures',
        'Вартість адміністративних процедур',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'lack_of_information',
      '$kuid': 'eec9a2a50f',
      'label': [
        'Lack of information',
        'Відсутність інформації',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'distance_or_cost_of_transportation',
      '$kuid': 'ff79e72434',
      'label': [
        'Distance or cost of transportation',
        'Відстань або вартість транспортування',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'lack_of_devices_or_internet',
      '$kuid': '17d312ad7e',
      'label': [
        'Lack of devices or internet connectivity',
        'Відсутність пристроїв або Інтернету',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'lack_of_legal_support',
      '$kuid': 'f4441c6327',
      'label': [
        'Lack of legal support',
        'Відсутність правової допомоги',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'inability_of_service',
      '$kuid': '56cfdb933a',
      'label': [
        'Inability of the service to provide documentation',
        'Нездатність служби надати документацію',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'discrimination',
      '$kuid': '525d6cc736',
      'label': [
        'Discrimination',
        'Дискримінація',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'distrust_of_authorities',
      '$kuid': '8ff9ad315a',
      'label': [
        'Distrust of public institutions and authorities',
        'Недовіра до державних інститутів та влади',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'no',
      '$kuid': 'ac9e3169ae',
      'label': [
        'No',
        'Ні',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'aef8174c07',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'doc_barriers',
    },
    {
      'name': 'presence_of_armed_or_security_actors',
      '$kuid': 'ba7a4f9a17',
      'label': [
        'Presence of armed or security actors',
        'Присутність озброєних суб\'єктів або силових структур',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'bombardment_shelling_or_threat_of_shelling',
      '$kuid': '85d7dd2e81',
      'label': [
        'Bombardment/shelling or threat of shelling',
        'Бомбардування/обстріл або загроза обстрілу',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'fighting_between_armed_or_security_actors',
      '$kuid': '62e881461a',
      'label': [
        'Fighting between armed or security actors',
        'Бійки між озброєними суб\'єктами або представниками силових структур',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'landmines_or_uxos_contamination',
      '$kuid': '7c239148dd',
      'label': [
        'Landmines or UXOs contamination',
        'Забруднення наземними мінами або вибухонебезпечними залишками війни',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'criminality',
      '$kuid': '71801c9234',
      'label': [
        'Criminality',
        'Злочинність',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'intercommunity_tensions',
      '$kuid': '39d4365e4c',
      'label': [
        'Intercommunity tensions',
        'Міжсуспільна напруга',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'risks_of_eviction',
      '$kuid': 'fec3a8bb73',
      'label': [
        'Risks of eviction',
        'Ризики виселення',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'risks_of_arbitrary_arrest_detention',
      '$kuid': 'b6a7493b04',
      'label': [
        'Risks of arbitrary arrest/detention',
        'Ризики свавільного арешту/затримання',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'risks_of_abduction_or_enforced_disappearance',
      '$kuid': '42e9b2c6ea',
      'label': [
        'Risks of abduction or enforced disappearance',
        'Ризики викрадення або насильницького зникнення',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'risks_of_sexual_violence_and_exploitation',
      '$kuid': '4f20cf8878',
      'label': [
        'Risks of sexual violence and exploitation',
        'Ризики сексуального насильства та експлуатації',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '1c48b7b88a',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': 'other',
      '$kuid': '487100a69f',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'unsafe_factors',
    },
    {
      'name': '_1_very_bad',
      '$kuid': 'af6aa754ef',
      'label': [
        '1 - Very bad',
        '1 - Дуже погано',
      ],
      'list_name': 'community_rel',
    },
    {
      'name': '_2_bad',
      '$kuid': 'b9ea1b807c',
      'label': [
        '2 - Bad',
        '2 - Погано',
      ],
      'list_name': 'community_rel',
    },
    {
      'name': '_3_acceptable',
      '$kuid': 'bf27572ed9',
      'label': [
        '3 - Acceptable',
        '3 - Прийнятно',
      ],
      'list_name': 'community_rel',
    },
    {
      'name': '_4_good',
      '$kuid': '6c8027ca4d',
      'label': [
        '4 - Good',
        '4 - Добре',
      ],
      'list_name': 'community_rel',
    },
    {
      'name': '_5_very_good',
      '$kuid': '3a008f9afc',
      'label': [
        '5 - Very good',
        '5 - Дуже добре',
      ],
      'list_name': 'community_rel',
    },
    {
      'name': 'language_difference',
      '$kuid': 'ec359e5c05',
      'label': [
        'Language difference',
        'Мовна різниця',
      ],
      'list_name': 'rel_factors',
    },
    {
      'name': 'tension_over_access_to_humanitarian_assistance',
      '$kuid': 'ce9b670dd2',
      'label': [
        'Tension over access to humanitarian assistance',
        'Напруга навколо доступу до гуманітарної допомоги',
      ],
      'list_name': 'rel_factors',
    },
    {
      'name': 'tension_over_access_to_services_and_or_employment_opportunities',
      '$kuid': '403c67d703',
      'label': [
        'Tension over access to services and/or employment opportunities',
        'Напруга щодо доступу до послуг та/або можливостей працевлаштування',
      ],
      'list_name': 'rel_factors',
    },
    {
      'name': 'tension_over_conscription_procedures',
      '$kuid': 'bc63905986',
      'label': [
        'Tension over conscription procedures',
        'Напруга навколо призову на військову службу',
      ],
      'list_name': 'rel_factors',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'ec51c644eb',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'rel_factors',
    },
    {
      'name': 'other_specify',
      '$kuid': '9f6fb7e601',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'rel_factors',
    },
    {
      'name': 'harassment_violence_or_abuse',
      '$kuid': '0c6c83e076',
      'label': [
        'Harassment, violence or abuse',
        'Переслідування, насильство або образа',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'discrimination_over_access_to_basic_services',
      '$kuid': '8c10132427',
      'label': [
        'Discrimination over access to basic services',
        'Дискримінація щодо доступу до основних послуг',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'restrictions_on_participation_in_public_affairs_and_community_events',
      '$kuid': 'ac1989929b',
      'label': [
        'Restrictions on participation in public affairs and community events',
        'Обмеження на участь у громадських справах та громадських заходах',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'dispute_over_access_to_humanitarian_assistance',
      '$kuid': '77b46c4425',
      'label': [
        'Dispute over access to humanitarian assistance',
        'Суперечки щодо доступу до гуманітарної допомоги',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'dispute_or_conflict_over_land_shelter_property',
      '$kuid': 'bd20380f49',
      'label': [
        'Dispute or conflict over land, shelter, property',
        'Суперечки або конфлікт щодо землі, житла, власності',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'dispute_or_conflict_over_livelihood_or_other_financial_resources',
      '$kuid': 'd6ad261894',
      'label': [
        'Dispute or conflict over livelihood or other financial resources',
        'Суперечки або конфлікт щодо засобів до існування чи інших фінансових ресурсів',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'dispute_or_conflict_over_ethic_political_or_social_issues',
      '$kuid': '3e77e02e2a',
      'label': [
        'Dispute or conflict over ethic, political or social issues',
        'Суперечки або конфлікт з етичних, політичних чи соціальних питань',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'no_incident_experienced',
      '$kuid': 'e137de21ea',
      'label': [
        'No incident experienced',
        'Жодного інциденту не було',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'bc4f24f4ec',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'other_specify',
      '$kuid': '813e3b1879',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'community_incidents',
    },
    {
      'name': 'no',
      '$kuid': 'e5311415e7',
      'label': [
        'No',
        'Hi',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'fear_of_conscription_including_selfrestriction_of_movement',
      '$kuid': '15deb59a97',
      'label': [
        'Fear of conscription, including self-restriction of movement',
        'Страх призову, в тому числі самообмеження пересування',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'lack_of_documentation',
      '$kuid': 'c10aef7016',
      'label': [
        'Lack of documentation',
        'Відсутність документації',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'armed_conflict_including_shelling',
      '$kuid': 'b88a55b187',
      'label': [
        'Armed conflict, including shelling',
        'Збройний конфлікт, включно з обстрілами',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'presence_of_explosive_ordnance',
      '$kuid': '74a08a815c',
      'label': [
        'Presence of explosive ordnance',
        'Наявність вибухонебезпечних предметів',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'risks_of_sexual_violence_and_exploitation',
      '$kuid': 'ca733fdc0b',
      'label': [
        'Risks of sexual violence and exploitation',
        'Ризики сексуального насильства та експлуатації',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'discrimination',
      '$kuid': '72a6310170',
      'label': [
        'Discrimination',
        'Дискримінація',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'intercommunity_tensions',
      '$kuid': 'bc854b857e',
      'label': [
        'Intercommunity tensions',
        'Міжсуспільна напруга',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'lack_of_transportationfinancial_resources_to_pay_transportation',
      '$kuid': '3df6a4bf64',
      'label': [
        'Lack of transportation/financial resources to pay transportation',
        'Відсутність транспортних/фінансових ресурсів для оплати проїзду',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'reduced_mobility_linked_with_health_issues_or_disability',
      '$kuid': '48389b4e8a',
      'label': [
        'Reduced mobility linked with health issues or disability',
        'Обмеження рухливості, пов’язане з проблемами зі здоров’ям або інвалідністю',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'd11b4c6472',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': 'other_specify',
      '$kuid': '3e1134ae72',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'move_barriers',
    },
    {
      'name': '_1_very_unsafe',
      '$kuid': '180cf75c1a',
      'label': [
        '1 - Very unsafe',
        '1 - Дуже небезпечно',
      ],
      'list_name': 'safety_level',
    },
    {
      'name': '_2_unsafe',
      '$kuid': 'c4f101c47e',
      'label': [
        '2 - Unsafe',
        '2 - Небезпечно',
      ],
      'list_name': 'safety_level',
    },
    {
      'name': '_3_safe',
      '$kuid': '59a805ca0a',
      'label': [
        '3 - Safe',
        '3 - Безпечно',
      ],
      'list_name': 'safety_level',
    },
    {
      'name': '_4_very_safe',
      '$kuid': '0109cd6c72',
      'label': [
        '4 - Very safe',
        '4 - Дуже безпечно',
      ],
      'list_name': 'safety_level',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '55312a40cd',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'safety_level',
    },
    {
      'name': 'killing',
      '$kuid': 'bc94a17c91',
      'label': [
        'Killing',
        'Вбивство',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'injury_indiscriminate_attack',
      '$kuid': '540c5a2f30',
      'label': [
        'Injury due to indiscriminate attacks',
        'Поранення внаслідок невибіркових нападів',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'abduction',
      '$kuid': 'e69a863e93',
      'label': [
        'Abduction or enforced disappearance',
        'Викрадення або насильницьке зникнення',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'arbitrary_detention',
      '$kuid': '9582854b74',
      'label': [
        'Arbitrary arrest or detention',
        'Безпідставний арешт або затримання',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'forced_recruitment',
      '$kuid': 'fc46fdbb11',
      'label': [
        'Forced recruitment',
        'Примусова вербовка',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'physical_assault',
      '$kuid': '40ca2d24a1',
      'label': [
        'Physical assault',
        'Фізичний напад',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'sexual_violence',
      '$kuid': 'e2c86a30c5',
      'label': [
        'Sexual violence',
        'Сексуальне насильство',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'forced_labour',
      '$kuid': '78e4a68472',
      'label': [
        'Forced or exploitative labour',
        'Примусова або експлуататорська праця',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'property_destruction',
      '$kuid': '412cb407ab',
      'label': [
        'Destruction of property',
        'Знищення майна',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'theft_robbery',
      '$kuid': '4c2ce1c0f9',
      'label': [
        'Theft or robbery',
        'Крадіжка або грабіж',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'denial_basic_services',
      '$kuid': '9518224251',
      'label': [
        'Denial of basic services or aid',
        'Відмова в доступі до базових послуг або допомоги',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '59d9e594da',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'none',
      '$kuid': '3f45113bce',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'other_specify',
      '$kuid': 'b82901f7e9',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'violence_type',
    },
    {
      'name': 'age',
      '$kuid': '39eaee4902',
      'label': [
        'Age',
        'Вік',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'gender',
      '$kuid': '2af9ceffe9',
      'label': [
        'Gender',
        'Стать',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'disability',
      '$kuid': 'df44b8eb40',
      'label': [
        'Disability',
        'Інвалідність',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'nationality',
      '$kuid': '190d126c7b',
      'label': [
        'Nationality',
        'Національність',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'ethnicity',
      '$kuid': 'f7bf7b5ba1',
      'label': [
        'Ethnicity',
        'Етнічна приналежність',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'religion',
      '$kuid': '171a798216',
      'label': [
        'Religion',
        'Релігія',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'language',
      '$kuid': '164fd4c690',
      'label': [
        'Language',
        'Мова',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'political_opinion',
      '$kuid': 'ed3613c597',
      'label': [
        'Political opinions',
        'Політичні погляди',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'medical_condition',
      '$kuid': '9d95c72693',
      'label': [
        'Medical condition',
        'Стан здоров\'я',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '7d6d2adb3f',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'none',
      '$kuid': 'de22a265f5',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'other_specify',
      '$kuid': '3499646f51',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'discrimination_ground',
    },
    {
      'name': 'feeling_sad_depressed_tired',
      '$kuid': '3cf902b19d',
      'label': [
        'Feeling sad or depressed or tired',
        'Почуття смутку або депресії або втоми',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'withdrawal_isolation',
      '$kuid': 'e2b2cc01f3',
      'label': [
        'Withdrawal or isolation',
        'Відсторонення або ізоляція',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'anxiety',
      '$kuid': '56f1e52b51',
      'label': [
        'Anxiety',
        'Тривога',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'anger',
      '$kuid': '01fb1acaf3',
      'label': [
        'Anger',
        'Гнів',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'fear',
      '$kuid': '7632860788',
      'label': [
        'Fear',
        'Страх',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'agitation_moodiness',
      '$kuid': '50a3ee2992',
      'label': [
        'Agitation or moodiness',
        'Неспокій або мінливість настрою',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'feeling_hopeless',
      '$kuid': '55e101b5cc',
      'label': [
        'Feeling hopeless',
        'Почуття безнадії',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'no_sign_of_distress',
      '$kuid': '78061a72ad',
      'label': [
        'No sign of psychological distress',
        'Жодних ознак психологічного розладу',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '9734625256',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'none',
      '$kuid': '69935dde9f',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'other_specify',
      '$kuid': '4f0087c559',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'distress_signs',
    },
    {
      'name': 'lack_services',
      '$kuid': 'f3874df781',
      'label': [
        'Lack of available services',
        'Відсутність доступних послуг',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'lack_information',
      '$kuid': '1769c6456a',
      'label': [
        'Lack of information about services',
        'Відсутність інформації про послуги',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'distance_transport',
      '$kuid': 'e05d2a4339',
      'label': [
        'Distance or lack of transportation',
        'Відстань або відсутність транспорту',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'cost_transport',
      '$kuid': '4fc68d6f06',
      'label': [
        'Cost of transportation',
        'Витрати на транспорт',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'cost_services',
      '$kuid': '60d6afef5a',
      'label': [
        'Cost of services or medication',
        'Вартість послуг або ліків',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'language_barrier',
      '$kuid': '30cdec849b',
      'label': [
        'Language barriers',
        'Мовні бар\'єри',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'documentation_required',
      '$kuid': '7b5758a747',
      'label': [
        'Documentation requirements',
        'Вимоги до документації',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'poor_quality',
      '$kuid': '573343eadb',
      'label': [
        'Poor quality of services',
        'Низька якість послуг',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '2007041e27',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'none',
      '$kuid': 'b5d86693df',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'other_specify',
      '$kuid': '2ab2a384a6',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'care_barriers',
    },
    {
      'name': 'displacement_stress',
      '$kuid': '97e46b8c99',
      'label': [
        'Displacement-related stress',
        'Стрес пов’язаний з переміщенням',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'fear_armed_violence',
      '$kuid': '07d16a3954',
      'label': [
        'Fear of armed violence',
        'Страх збройного насильства',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'property_damage_fear',
      '$kuid': '2f7206575f',
      'label': [
        'Fear of property damage',
        'Страх пошкодження майна',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'fear_sexual_violence',
      '$kuid': '225f9ee13d',
      'label': [
        'Fear of sexual violence',
        'Страх сексуального насильства',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'missing_family',
      '$kuid': '4fce0ea84a',
      'label': [
        'Missing family members',
        'Зниклі члени сім’ї',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'lack_basic_services',
      '$kuid': '890f57f44b',
      'label': [
        'Lack of access to basic services',
        'Відсутність доступу до базових послуг',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'lack_employment',
      '$kuid': 'c0cc1622ff',
      'label': [
        'Lack of employment opportunities',
        'Відсутність можливостей працевлаштування',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'worries_children',
      '$kuid': '7423b1f53e',
      'label': [
        'Worries about children',
        'Стурбованість про дітей',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'worries_future',
      '$kuid': '161e184df4',
      'label': [
        'Worries about the future',
        'Стурбованість про майбутнє',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': '56df7167c6',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'none',
      '$kuid': '5186795596',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'other_specify',
      '$kuid': '75220bf863',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'stress_factors',
    },
    {
      'name': 'salary_formal',
      '$kuid': '57c49ef491',
      'label': [
        'Salary – formal employment',
        'Зарплата – офіційне працевлаштування',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'casual',
      '$kuid': 'd09f624b41',
      'label': [
        'Casual / temporary labour',
        'Випадкова (тимчасова) праця',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'remittances',
      '$kuid': 'b2abe61078',
      'label': [
        'Remittances',
        'Грошові перекази',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'family_support',
      '$kuid': '3cdf390218',
      'label': [
        'Assistance from family / friends',
        'Підтримка з боку родини / друзів',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'debt',
      '$kuid': '4c207f52cb',
      'label': [
        'Debt',
        'Борг',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'savings',
      '$kuid': 'f4a5c9cfe6',
      'label': [
        'Savings',
        'Заощадження',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'humanitarian',
      '$kuid': '082e1749de',
      'label': [
        'Humanitarian assistance (cash or in-kind)',
        'Гуманітарна допомога (готівкою або в натуральній формі)',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'business',
      '$kuid': 'a6147205aa',
      'label': [
        'Business / self-employment',
        'Бізнес / самозайнятість',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'social_protection',
      '$kuid': 'e940bbd80d',
      'label': [
        'Social protection payments',
        'Виплати соціального захисту',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'none',
      '$kuid': 'a43d183001',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'unable',
      '$kuid': '603b964e11',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'income_sources',
    },
    {
      'name': 'idp_allowance',
      '$kuid': '8854394c8b',
      'label': [
        'IDP allowance',
        'Допомога ВПО',
      ],
      'list_name': 'social_support',
    },
    {
      'name': 'pension_elderly',
      '$kuid': '6e297bab25',
      'label': [
        'Pension for elderly people',
        'Пенсія для людей похилого віку',
      ],
      'list_name': 'social_support',
    },
    {
      'name': 'pension_disability',
      '$kuid': '4c8e67857b',
      'label': [
        'Pension for persons with disability',
        'Пенсія для людей з інвалідністю',
      ],
      'list_name': 'social_support',
    },
    {
      'name': 'pension_children',
      '$kuid': '2f3d6c5559',
      'label': [
        'Pension for 3 or more children',
        'Пенсія на 3 або більше дітей',
      ],
      'list_name': 'social_support',
    },
    {
      'name': 'none',
      '$kuid': '401b3dd897',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'social_support',
    },
    {
      'name': 'unable',
      '$kuid': '368519d79b',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'social_support',
    },
    {
      'name': 'no_income',
      '$kuid': 'b178c44eff',
      'label': [
        'No income',
        'Доходи відсутні',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': 'up_to_3000',
      '$kuid': '0e9d41f89b',
      'label': [
        'Up to 3,000 UAH',
        'До 3000 грн',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': '3001_6000',
      '$kuid': '7fc7e38d60',
      'label': [
        '3,001–6,000 UAH',
        'Від 3001 до 6000 грн',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': '6001_9000',
      '$kuid': 'a1ee995bff',
      'label': [
        '6,001–9,000 UAH',
        'Від 6001 до 9000 грн',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': '9001_12000',
      '$kuid': 'c9e495fcec',
      'label': [
        '9,001–12,000 UAH',
        'Від 9001 до 12000 грн',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': '12001_15000',
      '$kuid': '3af2fed6be',
      'label': [
        '12,001–15,000 UAH',
        'Від 12 001 до 15 000 грн',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': 'over_15000',
      '$kuid': '0f604840c8',
      'label': [
        'More than 15,000 UAH',
        'Більше 15 000 грн',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': 'unable',
      '$kuid': 'dbc1abdde3',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'monthly_income',
    },
    {
      'name': 'no_jobs',
      '$kuid': 'dee99f1d2f',
      'label': [
        'Lack of available jobs',
        'Відсутність робочих місць',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'low_season',
      '$kuid': '713da3fab2',
      'label': [
        'Low or off season',
        'Низький або позасезонний період',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'skill_mismatch',
      '$kuid': 'a0d239cbce',
      'label': [
        'Skills do not match demand',
        'Навички не відповідають попиту',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'caregiving',
      '$kuid': '374e5eb1a5',
      'label': [
        'Housework / caring for children',
        'Робота по дому / догляд за дітьми',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'no_info',
      '$kuid': '23b2357e4b',
      'label': [
        'Lack of job market information',
        'Відсутність інформації про ринок праці',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'no_experience',
      '$kuid': '7895f4c358',
      'label': [
        'Lack of experience',
        'Відсутність досвіду',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'disability',
      '$kuid': '8c33827151',
      'label': [
        'Physical limitations / disability',
        'Фізичні обмеження / інвалідність',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'age_discrimination',
      '$kuid': '3d01c1cb60',
      'label': [
        'Age discrimination',
        'Дискримінація за віком',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'mines',
      '$kuid': '154e695847',
      'label': [
        'Mine contamination',
        'Мінне забруднення',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'none',
      '$kuid': 'f408196ef1',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'unable',
      '$kuid': '79a8cfff6a',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'unemployment_reasons',
    },
    {
      'name': 'savings',
      '$kuid': 'abdd948bef',
      'label': [
        'Spending savings',
        'Використання заощаджень',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'sell_assets',
      '$kuid': '2bcf6b2b43',
      'label': [
        'Selling household assets',
        'Продаж майна домогосподарства',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'sell_aid',
      '$kuid': '9368f32ecc',
      'label': [
        'Selling humanitarian assistance',
        'Продаж гуманітарної допомоги',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'sell_house',
      '$kuid': 'be3270d084',
      'label': [
        'Selling housing or land',
        'Продаж житла або землі',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'borrow',
      '$kuid': 'c006294cd1',
      'label': [
        'Borrowing money',
        'Позика грошей',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'family_support',
      '$kuid': '30fb20b7bd',
      'label': [
        'Relying on family / external support',
        'Залежність від підтримки родини',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'begging',
      '$kuid': 'fc55911d70',
      'label': [
        'Begging',
        'Жебракування',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'dangerous_work',
      '$kuid': '0368580330',
      'label': [
        'Dangerous or exploitative work',
        'Небезпечна або експлуатаційна робота',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'less_food',
      '$kuid': '61c98115c1',
      'label': [
        'Reducing food consumption',
        'Зменшення споживання їжі',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'less_health',
      '$kuid': '04daa6b5f6',
      'label': [
        'Reducing healthcare or medicines',
        'Зменшення медичних послуг або ліків',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'child_labour',
      '$kuid': '3df2b1416c',
      'label': [
        'Sending children to work',
        'Направлення дітей на роботу',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'no_school',
      '$kuid': 'ffd4288267',
      'label': [
        'Removing children from education',
        'Відсторонення дітей від навчання',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'relocate',
      '$kuid': 'fe4197eb0e',
      'label': [
        'Sending members elsewhere',
        'Відправлення членів ДГ жити в інше місце',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'poor_housing',
      '$kuid': 'cac8d65655',
      'label': [
        'Choosing worse accommodation',
        'Вибір менш придатного житла',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'none',
      '$kuid': '2f549aa81e',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'unable',
      '$kuid': 'fa30d45300',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'coping_strategies',
    },
    {
      'name': 'all',
      '$kuid': '1b84082224',
      'label': [
        'All children attend',
        'Усі діти відвідують',
      ],
      'list_name': 'school_attendance_status',
    },
    {
      'name': 'partial',
      '$kuid': '1c35ab3a66',
      'label': [
        'Some children attend',
        'Деякі діти відвідують',
      ],
      'list_name': 'school_attendance_status',
    },
    {
      'name': 'none',
      '$kuid': '928edc57a7',
      'label': [
        'None attend',
        'Жодна дитина не відвідує',
      ],
      'list_name': 'school_attendance_status',
    },
    {
      'name': 'unable',
      '$kuid': '333fbc645a',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'school_attendance_status',
    },
    {
      'name': 'newly_displaced',
      '$kuid': '550035bcb3',
      'label': [
        'Newly displaced',
        'Нещодавно переміщені',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'no_school',
      '$kuid': 'c43f87b418',
      'label': [
        'Lack of available school',
        'Відсутність школи',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'no_internet',
      '$kuid': '01e5bea1df',
      'label': [
        'No internet for online school',
        'Відсутність Інтернету',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'safety',
      '$kuid': 'd51c4e9b6b',
      'label': [
        'Safety risks',
        'Ризики для безпеки',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'distance',
      '$kuid': '7a0deb37ee',
      'label': [
        'Distance / transport barrier',
        'Відстань / транспорт',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'transport_cost',
      '$kuid': 'cb7a1d97d4',
      'label': [
        'Transportation cost',
        'Вартість транспорту',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'online_cost',
      '$kuid': '04fa7a0320',
      'label': [
        'Online education cost',
        'Вартість онлайн-навчання',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'no_docs',
      '$kuid': '46ff237f99',
      'label': [
        'Lack of documentation',
        'Відсутність документів',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'no_cert',
      '$kuid': '8bc3e49b3c',
      'label': [
        'Lack of recognized certificates',
        'Відсутність визнаних довідок',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'discrimination',
      '$kuid': '5c0cb912a0',
      'label': [
        'Discrimination / restriction',
        'Дискримінація / обмеження',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'special_needs',
      '$kuid': '320cb7110d',
      'label': [
        'No specialized services',
        'Відсутність спецпослуг',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'materials_cost',
      '$kuid': 'cec865361a',
      'label': [
        'Cost of materials',
        'Вартість матеріалів',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'language',
      '$kuid': '12e759e709',
      'label': [
        'Language barriers',
        'Мовні бар’єри',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'none',
      '$kuid': 'f01304099c',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'unable',
      '$kuid': 'be1b8a4372',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'education_barriers',
    },
    {
      'name': 'house',
      '$kuid': 'ccf988d97c',
      'label': [
        'House / apartment',
        'Будинок / квартира',
      ],
      'list_name': 'housing_type',
    },
    {
      'name': 'room',
      '$kuid': 'faddab816c',
      'label': [
        'Room in private house',
        'Кімната в приватному будинку',
      ],
      'list_name': 'housing_type',
    },
    {
      'name': 'shelter',
      '$kuid': '5315fae122',
      'label': [
        'Collective shelter',
        'Колективний притулок',
      ],
      'list_name': 'housing_type',
    },
    {
      'name': 'private_shelter',
      '$kuid': '61d206a699',
      'label': [
        'Private collective shelter',
        'Приватний колективний притулок',
      ],
      'list_name': 'housing_type',
    },
    {
      'name': 'none',
      '$kuid': 'da09d9c748',
      'label': [
        'No shelter',
        'Немає притулку',
      ],
      'list_name': 'housing_type',
    },
    {
      'name': 'unable',
      '$kuid': 'af7ad61604',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'housing_type',
    },
    {
      'name': 'host_family',
      '$kuid': 'ce073e0c6e',
      'label': [
        'Host family (no rent)',
        'Проживання в сім’ї',
      ],
      'list_name': 'tenure_status',
    },
    {
      'name': 'rent',
      '$kuid': '28402bd2c2',
      'label': [
        'Renting accommodation',
        'Оренда житла',
      ],
      'list_name': 'tenure_status',
    },
    {
      'name': 'own',
      '$kuid': '46ca9376b9',
      'label': [
        'Owning accommodation',
        'Власне житло',
      ],
      'list_name': 'tenure_status',
    },
    {
      'tag': 'відповідати',
      'name': 'squat',
      '$kuid': '5b274f26ce',
      'label': [
        'Squatting without permission',
        'Самовільне проживання',
      ],
      'list_name': 'tenure_status',
    },
    {
      'name': 'none',
      '$kuid': 'e05e7d6a2b',
      'label': [
        'None',
        'Немає',
      ],
      'list_name': 'tenure_status',
    },
    {
      'name': 'unable',
      '$kuid': 'ae81365ac1',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'tenure_status',
    },
    {
      'name': 'good',
      '$kuid': 'ad209927a0',
      'label': [
        'Sound condition',
        'Непошкоджений стан',
      ],
      'list_name': 'housing_condition',
    },
    {
      'name': 'partial',
      '$kuid': 'a4a94185c7',
      'label': [
        'Partially damaged',
        'Частково пошкоджене',
      ],
      'list_name': 'housing_condition',
    },
    {
      'name': 'severe',
      '$kuid': '4d0a856856',
      'label': [
        'Severely damaged',
        'Сильно пошкоджене',
      ],
      'list_name': 'housing_condition',
    },
    {
      'name': 'destroyed',
      '$kuid': '0c3731ef5b',
      'label': [
        'Destroyed',
        'Зруйноване',
      ],
      'list_name': 'housing_condition',
    },
    {
      'name': 'unfinished',
      '$kuid': '641278fc42',
      'label': [
        'Unfinished',
        'Незакінчене',
      ],
      'list_name': 'housing_condition',
    },
    {
      'name': 'unable',
      '$kuid': 'e009e4b85a',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'housing_condition',
    },
    {
      'name': 'none',
      '$kuid': '75316b2d4d',
      'label': [
        'None',
        'Жодного',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'eviction',
      '$kuid': 'b365850a6d',
      'label': [
        'Risk of eviction',
        'Ризик виселення',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'damage',
      '$kuid': 'e037f21039',
      'label': [
        'Housing condition issues',
        'Пошкодження житла',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'overcrowded',
      '$kuid': '820b6870fb',
      'label': [
        'Overcrowding / lack of privacy',
        'Переповнення / відсутність приватності',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'utilities',
      '$kuid': '4fa894c6f4',
      'label': [
        'Lack of utilities',
        'Відсутність комунальних послуг',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'connectivity',
      '$kuid': '1dfb5afbf6',
      'label': [
        'Lack of connectivity',
        'Відсутність зв’язку',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'safety',
      '$kuid': 'b7b78afa39',
      'label': [
        'Security risks',
        'Ризики безпеки',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'compensation',
      '$kuid': '7273fe05d1',
      'label': [
        'No compensation for damage',
        'Відсутність компенсації',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'documents',
      '$kuid': 'f1f0b89306',
      'label': [
        'Missing ownership documents',
        'Відсутність документів',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'disability',
      '$kuid': 'f79ef18d6a',
      'label': [
        'Not disability inclusive',
        'Не пристосоване для людей з інвалідністю',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'unable',
      '$kuid': '48f79dd1d6',
      'label': [
        'Unable / unwilling to answer',
        'Не можу / не хочу відповідати',
      ],
      'list_name': 'housing_concerns',
    },
    {
      'name': 'uhf',
      '$kuid': 'a6e29cf861',
      'label': [
        'UHF',
        'UHF',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'echo',
      '$kuid': 'a4d50fd84b',
      'label': [
        'ECHO',
        'ECHO',
      ],
      'list_name': 'donor',
    },
    {
      'name': 'sumy',
      '$kuid': '46eef348ee',
      'label': [
        'Sumy (UMY)',
        'Суми (UMY)',
      ],
      'list_name': 'office',
    },
    {
      'name': 'chernihiv',
      '$kuid': '5ab33e8d5b',
      'label': [
        'Chernihiv (CEJ)',
        'Чернігів (CEJ)',
      ],
      'list_name': 'office',
    },
    {
      'name': 'dnipro',
      '$kuid': 'e31f06287f',
      'label': [
        'Dnipro (DNK)',
        'Дніпро (DNK)',
      ],
      'list_name': 'office',
    },
    {
      'name': 'kharkiv',
      '$kuid': 'c4f0b6893b',
      'label': [
        'Kharkiv (HRK)',
        'Харків (HRK)',
      ],
      'list_name': 'office',
    },
    {
      'name': 'mykolaiv',
      '$kuid': 'b7e9110a18',
      'label': [
        'Mykolaiv (NLV)',
        'Миколаїв (NLV)',
      ],
      'list_name': 'office',
    },
    {
      'name': 'sloviansk',
      '$kuid': '33bdc4cabe',
      'label': [
        'Sloviansk (SLO)',
        'Слов\'янськ (SLO)',
      ],
      'list_name': 'office',
    },
    {
      'name': 'elder__headed_household',
      '$kuid': '220932c788',
      'label': [
        'Elder (≥ 60) headed household',
        'Домогосподарство очолюване особою похилого віку (≥ 60)',
      ],
      'list_name': 'specfic_needs',
    },
    {
      'name': 'person_with_disability_headed_household',
      '$kuid': '94ce69e313',
      'label': [
        'Person with disability headed household',
        'Домогосподарство очолюване особою з інвалідністю',
      ],
      'list_name': 'specfic_needs',
    },
    {
      'name': 'chronicallyill_headed_household',
      '$kuid': '4304eea1b9',
      'label': [
        'Household headed by a person with serious medical condition',
        'Домогосподарство очолюване особою з хронічною хворобою',
      ],
      'list_name': 'specfic_needs',
    },
    {
      'name': 'no_specific_needs',
      '$kuid': 'f0adec8af7',
      'label': [
        'No specific needs',
        'Без особливих потреб',
      ],
      'list_name': 'specfic_needs',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'c428135940',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'specfic_needs',
    },
    {
      'name': 'other_specify',
      '$kuid': '6d5ff6c3d3',
      'label': [
        'Other (specify)',
        'Інше (вказати)',
      ],
      'list_name': 'specfic_needs',
    },
    {
      'name': 'none',
      '$kuid': '5931ead217',
      'label': [
        'None',
        'Жодного',
      ],
      'list_name': 'security_concerns_during_displacement',
    },
    {
      'name': 'looting_robbery',
      '$kuid': '2f847926aa',
      'label': [
        'Looting/robbery',
        'Грабунок/пограбування',
      ],
      'list_name': 'security_concerns_during_displacement',
    },
    {
      'name': 'physical_assault',
      '$kuid': '59ff7e1b5d',
      'label': [
        'Physical assault',
        'Фізичний напад',
      ],
      'list_name': 'security_concerns_during_displacement',
    },
    {
      'name': 'abduction',
      '$kuid': '2e38727dee',
      'label': [
        'Abduction',
        'Викрадення',
      ],
      'list_name': 'security_concerns_during_displacement',
    },
    {
      'name': 'arbitrary_detention',
      '$kuid': 'e970e899c0',
      'label': [
        'Arbitrary detention',
        'Безпідставне затримання',
      ],
      'list_name': 'security_concerns_during_displacement',
    },
    {
      'name': 'shelling_or_missile_attacks',
      '$kuid': '6f35af6504',
      'label': [
        'Shelling or missile attacks',
        'Обстріли або ракетні атаки',
      ],
      'list_name': 'security_concerns_during_displacement',
    },
    {
      'name': 'harassment_at_checkpoints',
      '$kuid': 'a02c780a56',
      'label': [
        'Harassment at checkpoints',
        'Знущання на блокпостах',
      ],
      'list_name': 'security_concerns_during_displacement',
    },
    {
      'name': 'movement_restrictions',
      '$kuid': 'd0f9b96b27',
      'label': [
        'Movement restrictions',
        'Обмеження руху',
      ],
      'list_name': 'security_concerns_during_displacement',
    },
    {
      'name': 'gbv_incident',
      '$kuid': 'b4a78d3df6',
      'label': [
        'GBV incident',
        'Інцидент ГН',
      ],
      'list_name': 'security_concerns_during_displacement',
    },
    {
      'name': 'extortion',
      '$kuid': 'ca60a816cb',
      'label': [
        'Extortion',
        'Вимагання',
      ],
      'list_name': 'security_concerns_during_displacement',
    },
    {
      'name': 'hate_speech',
      '$kuid': '0d7229f77b',
      'label': [
        'Hate speech',
        'Мова ненависті',
      ],
      'list_name': 'security_concerns_during_displacement',
    },
    {
      'name': 'unable_unwilling_to_answer',
      '$kuid': 'a3f0653f6b',
      'label': [
        'Unable/unwilling to answer',
        'Не можу/не хочу відповідати',
      ],
      'list_name': 'security_concerns_during_displacement',
    },
    {
      'name': 'other',
      '$kuid': '2c620cfc88',
      'label': [
        'Other',
        'Інше',
      ],
      'list_name': 'security_concerns_during_displacement',
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
