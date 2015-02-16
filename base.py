import pprint
import random
#Start by creating a population of organisms, each with two chromosomes encoding selection instructions.
pop = 100
worldsize=1000
initmaxmove = 4
pp = pprint.PrettyPrinter(indent=4)
def createPop():
	population = [chomper(4) for count in range(0, 100)]
	print population[5].genome
class chomper():
	id=0
	def __init__(self, genomesize):
		self.genomesize = genomesize
		genome = ""
		for i in range(0, genomesize):
			genome = genome+random.choice(["u","d","l","r"])
			genome = genome+str(random.choice(range(1, initmaxmove)))
		self.genome = genome
		self.id = chomper.id
		chomper.id+=1
createPop()