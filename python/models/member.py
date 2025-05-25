class Member:
    def __init__(self, first_name: str, last_name: str, sex: str, degree_program: str, batch: str, username: str, middle_name: str | None = None):
        self.__first_name = first_name
        self.__middle_name = middle_name
        self.__last_name = last_name
        self.__sex = sex
        self.__degree_program = degree_program
        self.__batch = batch
        self.__username = username

    # Getters
    def get_first_name(self):
        return self.__first_name
    
    def get_middle_name(self):
        return self.__middle_name
    
    def get_last_name(self):
        return self.__last_name
    
    def get_batch(self):
        return self.__batch

    def get_sex(self):
        return self.__sex
    
    def get_degree_program(self):
        return self.__degree_program
    
    def get_username(self):
        return self.__username
    
    # Setters
    def set_first_name(self, first_name):
        self.__first_name = first_name
    
    def set_middle_name(self, middle_name):
        self.__middle_name = middle_name
    
    def set_last_name(self, last_name):
        self.__last_name = last_name
    
    def set_batch(self, batch):
        self.__batch = batch

    def set_sex(self, sex):
        self.__sex = sex
    
    def set_degree_program(self, degree_program):
        self.__degree_program = degree_program
    