from os import listdir, path
from subprocess import run
from sys import executable, argv

from watchfiles import watch

model_path = "models"


def generate_model(file_name):
    run([executable, file_name])


for model in listdir(model_path):
    generate_model(path.join(model_path, model))

if "--watch" in argv[1:]:
    for model in watch(model_path):
        generate_model(model.pop()[1])
