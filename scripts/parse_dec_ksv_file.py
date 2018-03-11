import csv
import os.path
from bs4 import BeautifulSoup
import pickle
import json
from collections import OrderedDict


my_path = os.path.abspath(os.path.dirname(__file__))
in_fname = os.path.join(my_path, '../data/gmnysmeddropbox.csv')
p_fname = os.path.join(my_path, '../data/dec_data.p')
j_fname = p_fname = os.path.join(my_path, '../data/dec_data.txt')

location_to_location_type = OrderedDict([(('College'), 'School'), (('Hospital', 'VA'), 'Hospital'),
                              (('Duane Reade', 'Walgreens', 'Pharmacy', 'CVS', 'Rx', 'Drug', 'Medicine Shoppe'), 'Pharmacy'),
                              (('Police', 'Sheriff', 'Public Safety'), 'Police'),
                              (('County', 'Town Hall', 'Municipal', 'Village'), 'Government'),
                              (('Army', 'National Guard', 'Naval', 'Ft.'), 'Military'),
                              (('Family Medicine'), "Doctor's Office"),
                              (('ecopark'), 'Recycling Center')])

def determine_location_type(location):
    for location_list in location_to_location_type:
        for s in location_list:
            if s in location:
                return location_to_location_type[location_list]

def parse_description(html_desc):
    soup = BeautifulSoup(html_desc, 'html.parser').get_text()
    key_val_strings = soup.split('NYS Medication Drop Box')[1].split('\n')
    key_val_strings = [st for st in key_val_strings if len(st) > 1]
    list_of_arrs = [key_val_string.split(': ') for key_val_string in key_val_strings]
    for i, arr in enumerate(list_of_arrs):
        if len(arr) > 2:
            new_arr = [arr[0]] + [': '.join(arr[1:])]
            list_of_arrs[i] = new_arr
    list_of_arrs = [l for l in list_of_arrs if len(l) > 1]
    location_data = dict(list_of_arrs)
    location_data['Type'] = determine_location_type(location_data['Location'])
    return location_data

with open(in_fname, 'r') as f:
    reader = csv.DictReader(f)
    record_out = []
    for record in reader:
        description = parse_description(record['description'])
        print(description)
        record_out.append(description)
    with open(p_fname, 'wb') as g:
        pickle.dump(record_out, g)
    with open(j_fname, 'w') as h:
        json.dump(record_out, h)








