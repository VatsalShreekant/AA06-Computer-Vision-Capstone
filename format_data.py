# this script is used to format the data so i can run posenet on each iamge easier

# current files are as /class-name/images

import os

# directories
dir_downwarddog = 'yoga-dataset/training/downwarddog/'
dir_mountain = 'yoga-dataset/training/mountain/'
dir_tree = 'yoga-dataset/training/tree/'
dir_warrior1 = 'yoga-dataset/training/warrior1/'
dir_warrior2 = 'yoga-dataset/training/warrior2/'

dir_list = [dir_downwarddog, dir_mountain, dir_tree, dir_warrior1, dir_warrior2]

def change_filename(dir_name):
    try:
        for id, filename in enumerate(os.listdir(dir_name)):
            if filename.endswith(".png") or filename.endswith(".jpg"):
                # can just label them 1,2,3,...->
                temp = str(id) + '.jpg'
                src = dir_name + filename
                dst = dir_name + temp

                # rename
                try:
                    os.rename(src,dst)
                except:
                    print("file already exists")

            else:
                continue

    except:
        print("directory does not exist")

for item in dir_list:
    change_filename(item)