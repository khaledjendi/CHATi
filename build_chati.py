#!/usr/bin/python3

import sys, subprocess, argparse, fileinput, re

def main():
   version = ''
   parser = argparse.ArgumentParser(description='Build CHATi and distribute in all clusters')
   parser.add_argument('-v','--version', help='Version of the cluster', required=True)
   version = vars(parser.parse_args())['version']
   
   if not version.startswith('v') :
      print('Version must start with: v')
      print('For example: build_chati.py -v v5')
      return

   if version == '':
      print('Version must contain a value!')
      return

   print('CHATi version to be installed is: ' + version)
   updateVersion(version)
   pushCHATiToDockerRepo(version)
   pushCHATiToGitRepo(version)


def pushCHATiToDockerRepo(version):
   print('===== push to docker hub =====')
   print(subprocess.run(['docker', 'stop', '$(docker ps -a -q)']))
   print(subprocess.run(['docker', 'build', '--rm', '-f', 'Dockerfile', '-t', 'chati:' + version, '.']))
   print(subprocess.run(['docker', 'tag', 'chati:' + version, 'jschnitzer1/chati:' + version]))
   print(subprocess.run(['docker', 'run', '--rm', '-d', '-p', '80:80/tcp', 'chati:' + version]))
   print(subprocess.run(['docker', 'push', 'jschnitzer1/chati:' + version]))

def pushCHATiToGitRepo(version):
   print('===== push to github =====')
   print(subprocess.run(['git', 'add', '-A']))
   print(subprocess.run(['git', 'commit', '-m', 'build version: ' + version]))
   print(subprocess.run(['git', 'push', 'origin', 'master']))

def updateVersion(version):
   print('===== updating version =====')
   updateDeploymentYaml('deployment.yaml', version)
   updateDeploymentYaml('deployment.lb.yaml', version)
   print('...Configuration files updated...')
   updateEnvironment('./src/environments/environment.ts', version)
   updateEnvironment('./src/environments/environment.prod.ts', version)
   print('...environment variables updated...')

def updateEnvironment(file_name, version):
   for ts_line in fileinput.FileInput(file_name, inplace=1):
      ts_line = re.sub(r'version: \'v(\d+)\'','version: \'' + version +'\'', ts_line)
      print(ts_line, end = '')

def updateDeploymentYaml(file_name, version):
   for yaml_line in fileinput.FileInput(file_name, inplace=1):
      yaml_line = re.sub(r':v(\d+)',':' + version, yaml_line)
      print(yaml_line, end = '')

if __name__ == "__main__":
   main()